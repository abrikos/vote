import React from "react";

export default function TelegramLogin(props) {
    const id = 'TelegramLoginButton';

    const script = document.createElement('script');
    //script.src = 'https://telegram.org/js/telegram-widget.js?2';
    script.src = 'https://tg.dev/js/telegram-widget.js?3';
    script.setAttribute('data-telegram-login', props.siteInfo.botName);
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-request-access', 'write');
    //script.setAttribute('data-userpic', true);
    //script.setAttribute('data-onauth', `telegramAuth(user)`);
    script.setAttribute('data-auth-url', `${window.location.origin}/api/login/telegram?returnUrl=${props.returnUrl}`);
    script.async = true;
    const container = document.getElementById(id)
    container && container.appendChild(script);


    return <div id={id}>

    </div>
}
