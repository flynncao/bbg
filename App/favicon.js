const { existsSync, rmSync, copyFileSync, constants } = require("fs");
const shell = require("@electron/remote").shell;
const dialog = require("@electron/remote").dialog;

function view_current_icon () {
  if (existsSync(`${rootDir}/favicon.ico`))
    shell.openPath(`${rootDir}/favicon.ico`);
  else
    toast_creator("danger",langdata.ALERT_NOT_USING_ICON[lang_name]);
}

function delete_current_icon () {
  if (existsSync(`${rootDir}/favicon.ico`)) {
    rmSync(`${rootDir}/favicon.ico`);
    toast_creator("success",langdata.ALERT_SUCCESSFUL_CLEARING[lang_name]);
  } else {
    toast_creator("danger",langdata.ALERT_NOT_USING_ICON[lang_name]);
  }
}

function select_a_favicon () {
  const iconPath = dialog.showOpenDialogSync();
  if (iconPath !== undefined) {
    if (existsSync(`${rootDir}/favicon.ico`))
      rmSync(`${rootDir}/favicon.ico`);

    copyFileSync(`${iconPath}`, `${rootDir}/favicon.ico`, constants.COPYFILE_EXCL);
  } else {
    // 用户放鸽子的情况
    toast_creator("primary",langdata.ALERT_NOT_SELECT_ANY_ICON[lang_name]);
  }
}

module.exports = {
  select_a_favicon,
  delete_current_icon,
  view_current_icon,
};
