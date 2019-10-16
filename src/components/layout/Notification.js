
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const Notification = ({title,message,type}) => {

    return (
      store.addNotification({
        title,
        message,
        type,                         // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeInDown"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOutUp"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000 
        }
      })
    )
  }

 
export default Notification;