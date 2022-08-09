/**
 * 封装的消息组件
 * 参考Element-UI文档: https://element-plus.org/#/zh-CN/component/message
 *
 */
import { Loading, Message, MessageBox, Notification } from "element-ui";

export default {
  //Message消息提示: https://element-plus.org/#/zh-CN/component/message
  isOK(mgs = "成功") {
    Message.success({
      message: mgs,
      type: "success",
    });
  },

  Warning(msg = "警告") {
    Message.warning({
      message: msg,
      type: "warning",
    });
  },

  Info(msg = "注意") {
    Message(msg);
  },

  Error(msg = "错误") {
    Message.error(msg);
  },
};
