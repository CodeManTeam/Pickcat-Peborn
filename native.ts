/**
 * Send messages to native
 */
import { values as _values, isEmpty, find, keys, cloneDeep } from 'lodash-es';
import * as is from 'is_js';
import { v4 } from 'uuid';
import { IWorkspace } from '@crc/blink/dist/core/interfaces';

import { NemoStore } from 'common/redux';
import { CloudManager } from 'common/cloud';
import { get_split_options_by_name } from 'common/state/split_options';
import { get_scene_id_by_entity_id } from 'common/state/utils';
import { Utils } from 'webview/utils';
import * as I from 'webview/interfaces';
import * as A from 'webview/action_types';
import { post_message } from 'webview/bridge';
import { get_broadcast_name_pool } from 'webview/state/broadcasts';
import { get_cloud_dashboard } from 'webview/state/component_data';
import * as ProcedureFunc from 'webview/state/procedures';
import { get_variable_name_pool, get_variable_count } from 'webview/state/variables';
import { refresh_toolbox } from 'webview/blockly/toolbox';
import { workspaces_manager } from 'webview/blockly/workspaces';
import { select_error_block } from 'webview/blockly/blockly_app';
import { ProcedureUndo } from 'webview/undo_manager/procedure_undo';
import { action_add_broadcast } from 'webview/redux/reducers/state/broadcast/actions';
import { action_add_split_option } from 'webview/redux/reducers/state/split_option/actions';
import { action_modify_variables, action_add_variables_to_dict } from 'webview/redux/reducers/state/variable/actions';
import { get_message } from '../../i18n';

/**
 * Select actor on stage event
 * @param actor_id
 */
export function select_actor_on_stage(actor_id:I.ID):void {
  post_message(A.SELECT_ACTOR, { actor_id });
}

/**
 * Delete actor from stage event
 * @param actor_id
 */
export function delete_actor_from_stage(actor_id:I.ID):void {
  post_message(A.DELETE_ACTORS, { actor_ids: [actor_id] });
}

/**
 * Change actor pivot on stage event
 * @param payload
 */
export function change_actor_pivot_on_stage(payload:I.ChangeActorPivotPayload):void {
  post_message(A.ACTOR_PIVOT_CAN_RESET, payload);
}

/**
 * Set actor property from stage event
 * @param payload
 */
export function set_actor_property_from_stage(payload:I.SetActorPropertyPayload):void {
  post_message(A.ACTOR_SET_PROPERTY, payload);
}

/**
 * Set styles pivot from stage event
 * @param payload
 */
export function set_pivot_from_stage(payload:I.SetPivotPayload):void {
  post_message(A.SET_STYLES_CENTER_POINT, payload);
}

/**
 * Add variable event
 * @param type
 */
export function add_variable(category:I.CustomCategory, cb?:Function):void {
  const state = NemoStore.get_bcm_state();
  let cloud_info:I.AddCloudInfo;
  switch (category) {
    case I.CustomCategory.Cloud:
      const public_cv_count = get_variable_count(I.VariableType.PublicCV);
      const private_cv_count = get_variable_count(I.VariableType.PrivateCV);
      if (public_cv_count === CloudManager.constants.PUBLIC_CV_TOTAL_COUNT &&
        private_cv_count === CloudManager.constants.PRIVATE_CV_TOTAL_COUNT) {
        return show_native_toast(get_message('cloud_var/toast/limited'));
      }
      cloud_info = {
        public_cv: public_cv_count,
        public_cv_total: CloudManager.constants.PUBLIC_CV_TOTAL_COUNT,
        private_cv: private_cv_count,
        private_cv_total: CloudManager.constants.PRIVATE_CV_TOTAL_COUNT,
      };
      break;
    default:
      cloud_info = {};
      break;
  }

  post_message(
    A.ADD_VARIABLE,
    {
      type: category,
      global: get_variable_name_pool(state.variable),
      entity: get_variable_name_pool(state.variable, state.actors.current_actor || state.scenes.current_scene),
      cloud_info,
    },
    (variable:string) => {
      try {
        Utils.log.dLog(variable);
        if (!variable) { return; }
        NemoStore.dispatch(action_add_variables_to_dict(JSON.parse(variable)));
        refresh_toolbox();
        cb && cb();
        if (category === I.CustomCategory.Cloud) {
          const cloud_data = get_cloud_dashboard();
          const t = cloud_data.this_work_count || 0;
          const o = cloud_data.other_works_count || 0;
          const total = cloud_data.total_capacity || 8000;
          if (t + o >= total) {
            show_native_toast('cloud_var/toast/insufficient');
          }
        }
      } catch (err) {
        console.error('parse json error: ', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }
    },
  );
}

/**
 * Rename variable event
 * @param type
 * @param variable
 */
export function rename_variable(type:I.CustomCategory, variable:I.Variable, cb?:Function):void {
  const state = NemoStore.get_bcm_state();
  post_message(
    A.RENAME_VARIABLE,
    {
      type,
      name: variable.name,
      pool: get_variable_name_pool(state.variable, variable.is_global ? undefined : state.actors.current_actor || state.scenes.current_scene),
    },
    (name:string) => {
      Utils.log.dLog('rename_variable', name);
      if (!name) { return; }
      const old_name = variable.name;
      NemoStore.dispatch(action_modify_variables({ id: variable.id, property: 'name', value: name }));
      workspaces_manager.rename_entity('variable', { [old_name]: name } );
      refresh_toolbox();
      cb && cb();
    },
  );
}

/**
 * Add broadcast event
 * @param callback
 */
export function add_broadcast(callback:(id:I.ID) => void):void {
  const state = NemoStore.get_bcm_state();
  post_message(
    A.ADD_BROADCAST,
    { names: get_broadcast_name_pool(state.broadcast, state.scenes.current_scene) },
    (broadcast:string) => {
      try {
        Utils.log.dLog('add_broadcast', broadcast);
        if (!broadcast) { return; }
        const parsed = JSON.parse(broadcast);
        NemoStore.dispatch(action_add_broadcast(parsed));
        callback(parsed.id);
      } catch (err) {
        console.error('parse json error: ', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      }
    },
  );
}

/**
 * add split option to state
 */
export function add_split_option(set_value?:Function):void {
  const state = NemoStore.get_bcm_state();
  const cb = (name:string) => {
    if (!name) { return; }
    const options = get_split_options_by_name(state.split_options, name);
    if (!isEmpty(options)) {
      const option = find(options, (o:I.SplitOption) => o.id !== '_split_comma' && o.id !== '_split_space');
      if (option) {
        set_value && set_value(option.id);
        return;
      }
    }
    const id = v4();
    NemoStore.dispatch(action_add_split_option({ id, name }));
    set_value && set_value(id);
  };
  edit_text('', 'short', cb);
}

/**
 * Open style panel
 * @param value
 * @param callback
 */
export function open_style_panel(value:string, callback:(index:string) => void):void {
  post_message(
    A.OPEN_STYLE_PANEL,
    { index: Number.parseInt(value) - 1 },
    (index:string) => {
      Utils.log.dLog('open_style_panel', index);
      if (index === undefined) { return; }
      callback((parseInt(index) + 1).toString());
    },
  );
}

/**
 * Open audio panel
 * @param value
 * @param callback
 */
export function open_audio_panel(value:string, callback:(id:I.ID) => void):void {
  post_message(
    A.OPEN_AUDIO_PANEL,
    { id: value },
    (id:string) => {
      Utils.log.dLog('open_audio_panel', id);
      if (!id) { return; }
      callback(id);
    },
  );
}

/**
 * Play audio in native
 * @param rbid
 * @param url
 * @param entity_id
 * @param callback
 */
export function play_audio_in_native(id:I.ID, url:string, entity_id:I.ID, callback:() => void):void {
  post_message(A.PLAY_AUDIO, { id, sound: url, entity_id }, callback);
}

/**
 * Stop play all audio
 */
export function stop_audio_play_in_native(audio:string = 'all'):void {
  post_message(A.STOP_ALL_AUDIOS, { audio });
}

/**
 * Edit text
 * @param text
 * @param type
 * @param callback
 */
export function edit_text(text:string, type:I.TextInputType, callback:(input:string) => void):void {
  post_message(
    A.EDIT_TEXT,
    { text, type },
    (new_text:string) => {
      Utils.log.dLog(new_text);
      if (new_text === undefined) { callback(text); }
      callback(new_text);
    },
  );
}

/**
 * Edit procedure
 */
export function native_edit_procedure():void {
  post_message(A.EDIT_PROCEDURE);
}

/**
 * Edit procedure name
 * @param name
 * @param type
 * @param callback
 */
export function edit_procedure_name(name:string, callback:(input:string) => void):void {
  const pool = ProcedureFunc.get_procedure_name_pool();
  post_message(
    A.EDIT_PROCEDURE_NAME,
    { name, pool },
    (new_name:string) => {
      Utils.log.dLog(new_name);
      if (!new_name) { return callback(name); }
      callback(new_name);
      // 由于当前函数的方案本身的原因，重命名需要同步到bcm内
      const { current_procedure } = NemoStore.get_bcm_state().procedures;
      ProcedureFunc.rename_procedure(current_procedure, name, new_name);
      ProcedureUndo.update_undo_state();
    },
  );
}

export function edit_block_group_name(curr_name:string):Promise<string|undefined> {
  return new Promise<string | undefined>((resolve) => {
    post_message(
      A.EDIT_BLOCK_FOLD_TEXT,
      { text: curr_name },
      (result:string) => {
        try {
          Utils.log.dLog('edit_block_group_name', result);
          const parsed_result = JSON.parse(result);
          resolve(parsed_result.confirm ? parsed_result.text : undefined);
        } catch (err) {
          console.error('parse json error: ', JSON.stringify(err, Object.getOwnPropertyNames(err)));
          resolve(undefined);
        }
      },
    );
  });
}

/**
 * Add procedure parameter
 * @param callback
 */
export function add_procedure_param(params:string[], callback:(name:string) => void):void {
  post_message(
    A.ADD_PROCEDURE_PARAM,
    { pool: params },
    (name:string) => {
      Utils.log.dLog(name);
      if (!name) { return; }
      callback && callback(name);
      ProcedureUndo.put_into_undo_stack({ type: 'add_param', value: name });
    },
  );
}

/**
 * Delete procedure parameter
 * @param callback
 */
export function delete_procedure_param(name:string, callback:() => void):void {
  post_message(
    A.REMOVE_PROCEDURE_PARAM,
    undefined,
    (should_delete:boolean) => {
      if (should_delete) {
        callback && callback();
        ProcedureUndo.put_into_undo_stack({ type: 'remove_param', value: name });
      }
    },
  );
}

/**
 * show heart runtime error dialog
 * @param error
 */
export function open_block_error_dialog(error:I.BlockRunError):void {
  const scene_id = get_scene_id_by_entity_id(error.error_entity);
  post_message(
    A.ON_BLOCK_ERROR,
    { error_entity: error.error_entity, scene_id },
    (show_tooltip:boolean) => !!Number(show_tooltip) && select_error_block(Object.assign(error, { scene_id })),
  );
}

/**
 * show clear block confirm dialog
 * @param callback
 */
export function show_clear_blocks_dialog(callback:Function):void {
  post_message(A.SHOW_CLEAR_BLOCKS_DIALOG, '', (clear:boolean) => { !!Number(clear) && callback(); });
}

/**
 * Set theatre full screen
 */
export function set_full_screen():void {
  post_message(A.THEATRE_FULL_SCREEN, true);
}

/**
 * Update block undo & redo state
 */
export function update_block_undo_state(main_workspace:IWorkspace):void {
  if (!NemoStore.get_bcm_state().procedures.current_procedure) {
    post_message(A.UPDATE_UNDO_STACK, {
      can_undo: main_workspace.get_undo_stack().length > 0,
      can_redo: main_workspace.get_redo_stack().length > 0,
    });
  } else {
    ProcedureUndo.update_undo_state();
  }

}

/**
 * Play block sound effect
 * @param url
 */
export function play_block_sound_effect(url:string):void {
  post_message(A.PLAY_BLOCK_SOUND_EFFECT, { sound: url });
}

/**
 * Change runtime variables
 * @param data
 */
export function change_runtime_variables(data:I.Dict<I.Variable>):void {
  const variables = _values(data);
  post_message(A.CHANGE_RUNTIME_VARIABLES, { variables: fix_ios_android_parse_variables_bug(variables) });
}

/**
 * ios开发说他们解析any类型可费劲，得web帮他们移除value
 * android开发说他们不费劲，得web帮他们保留value字段
 * 因此产生了这个帮助ios和android解析字段的工具方法
 * 厉害了
 * @param variables 变量们
 * @returns 处理后可以传给原生的变量们
 */
export function fix_ios_android_parse_variables_bug(variables:I.Variable[]):Partial<I.Variable>[] {
  if (is.android()) {
    return variables;
  } else {
    const new_variables = variables.map((v) => {
      const new_v = cloneDeep(v);
      delete new_v.value;
      return new_v;
    });
    return new_variables;
  }
}

/**
 * Enable voice detection
 * @param enable
 */
export function enable_voice_detection(enable:boolean):void {
  post_message(A.ENABLE_VOICE_DETECTION, { enable });
}

/**
 * Enable phone shake detection
 * @param enable
 */
export function enable_phone_shake_detection(enable:boolean):void {
  post_message(A.TOGGLE_ACCELEROMETER, enable);
}

/**
 * Enable phone tilt detection
 * @param enable
 */
export function enable_phone_tilt_detection(enable:boolean):void {
  post_message(A.TOGGLE_TILT, enable);
}

/**
 * Reset all state done
 */
export function reset_all_state_done():void {
  post_message(A.RESET_ALL_STATE_DONE);
}

/**
 * Update style content done
 */
export function update_style_content_done():void {
  post_message(A.UPDATE_STYLE_CONTENT_DONE);
}

/**
 * Pop native toast
 * @param message
 */
export function show_native_toast(text:string, position?:I.IToastPosition):void {
  post_message(A.SHOW_TOAST, { text, position });
}

/**
 * Pop native toast
 * @param message
 */
export function show_notice(text:string):void {
  post_message(A.SHOW_TOAST, { text });
}

export function send_tacker_event(name:string, action:string, params:{ [key:string]:any } = {}):void {
  post_message(A.CREATION_TRACKER, { name, action, params });
}

export function edit_block_comment(text:string, callback:Function):void {
  post_message(
    A.EDIT_BLOCK_COMMENT,
    { text },
    (result:string) => {
      try {
        Utils.log.dLog('edit_block_comment', result);
        const parsed_result = JSON.parse(result);
        callback(parsed_result.confirm ? parsed_result.text : undefined);
      } catch (err) {
        console.error('parse json error: ', JSON.stringify(err, Object.getOwnPropertyNames(err)));
        callback(undefined);
      }
    },
  );
}

export function add_midi(callback:Function):void {
  post_message(A.ADD_MIDI, '', callback);
}

/**
 * 通知原生切换到指定屏幕的指定角色
 * @param scene_id 屏幕的ID
 * @param actor_id 角色的ID, 当为空字符串, 原生的处理为切换到指定屏幕的背景
 */
export function select_entity(data:{scene_id:I.ID, actor_id:I.ID}):void {
  post_message(A.SELECT_ENTITY, data);
}

export function select_extensions_categories(payload:Object, callback:Function):void {
  post_message(
    A.SELECT_EXTENSIONS_CATEGORIES,
    payload,
    callback,
  );
}

/**
 * 通知原生展示蓝牙页面侧边栏
 */
export function toggle_bluetooth_connection_page(visible:boolean) {
  post_message(A.TOGGLE_BLUETOOTH_CONNECTION_PAGE, { visible });
}

export function goto_app_settings(){
  post_message(A.GOTO_APP_SETTINGS, {}, () => { });
}

export function goto_system_settings(path:string){
  post_message(A.GOTO_SYSTEM_SETTINGS, { path }, () => { });
}

export function show_keyboard_dialog(text:string, callback?:Function) {
  post_message(A.SHOW_KEYBOARD_DIALOG, { text }, callback);
}

// 通用确认弹窗
export function show_confirm_dialog(payload:I.IConfirmDialog, callback?:Function):void {
  post_message(
    A.SHOW_CONFIRM_DIALOG,
    payload,
    callback,
  );
}
