import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";

export default function AdminUser(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        props.api('/admin/users').then(setUsers);
    }, [])

    function setAdmin(user) {
        user.admin = !user.admin;
        props.api(`/admin/user/${user._id}/change-admin`);
    }

    function deleteUser(user) {
        if(!window.confirm('Удалить юзера?')) return;
        props.api('/admin/user/delete',user)
            .then(()=>{
                setUsers(users.filter(u=>u.id !== user.id))
            })
    }

    return <div className="row">
        <table className="table-sm">
            <thead>
            <tr>
                <th>Юзер</th>
                <th>Login</th>
                <th>Стратегия</th>
                <th>Админ</th>
            </tr>
            </thead>
            <tbody>
            {users.map(u => <tr key={u.id}>

                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.strategy}</td>
                <td>
                    <input type="checkbox" defaultChecked={u.admin} onChange={() => setAdmin(u)}/> Администратор
                </td>
                <td>
                    <Button onClick={()=>deleteUser(u)} color="danger">Удалить</Button>
                </td>
            </tr>)}
            </tbody>
        </table>

    </div>

}
