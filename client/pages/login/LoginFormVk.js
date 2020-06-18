import {Button} from "reactstrap";
import React from "react";

export default function LoginFormVk(props) {
    const responseVk = (strategy) => {
        props.api('/redirect/' + strategy, {returnUrl: props.returnUrl}).then(res => {
            console.log(res.url)
            document.location.href = res.url;
        })
    }

    return <Button onClick={() => responseVk('vk')} color="primary"><img src={'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M15.68%200C22.4%200%2024%201.6%2024%208.32v7.36C24%2022.4%2022.4%2024%2015.68%2024H8.32C1.6%2024%200%2022.4%200%2015.68V8.32C0%201.6%201.6%200%208.32%200zM6.5%207.5H4.75c-.5%200-.6.24-.6.49%200%20.47.59%202.77%202.76%205.81a6.85%206.85%200%20005.34%203.2c1.11%200%201.25-.25%201.25-.68v-1.57c0-.5.11-.6.46-.6s.7.13%201.74%201.13c1.19%201.19%201.38%201.72%202.05%201.72h1.75c.5%200%20.75-.25.61-.74a7.43%207.43%200%2000-1.48-2.05c-.41-.49-1-1-1.21-1.26s-.18-.49%200-.78a21.83%2021.83%200%20002.36-4c.11-.37%200-.64-.53-.64H17.5a.77.77%200%2000-.76.49%2014.67%2014.67%200%2001-2.15%203.58c-.41.41-.6.54-.82.54s-.27-.13-.27-.5v-3.5c0-.44-.13-.64-.5-.64h-2.75a.43.43%200%2000-.45.4c0%20.42.64.52.7%201.71v2.57c0%20.57-.1.67-.32.67-.6%200-2-2.18-2.9-4.67C7.12%207.7%207%207.5%206.5%207.5z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E'} alt="В контакте" style={{width: 50}}/> </Button>
}
