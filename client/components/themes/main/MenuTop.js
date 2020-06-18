import React, {useState} from 'react';
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown,} from "reactstrap";
import {A, navigate, usePath} from "hookrouter";
import logo from "public/logo.svg"
import "./menu-top.sass"

export default function MenuTop(props) {
    const [menuPulled, pullMenu] = useState(false);
    const currentPath = usePath();

    function isActive(path) {
        return path === currentPath;
    }

    const items = [
        {label: 'Начало', path: '/'},
        {
            label: `${(props.authenticatedUser && props.authenticatedUser.displayName)}`, items: [
                {label: 'ADMIN', path: '/admin/post', hidden: !(props.authenticatedUser && props.authenticatedUser.isAdmin)},
                {label: 'Кабинет', path: '/cabinet'},
                {label: 'Выход', onClick: props.logOut, hidden: !props.authenticatedUser},
            ], hidden: !props.authenticatedUser
        },
        {
            label: 'Вход', onClick: () => {
                props.updateReturnUrl(window.location.pathname);
                navigate('/login')
            }, pathX: '/login?xx', hidden: props.authenticatedUser
        },
    ]

    return <div>

        <Navbar color="dark" expand="xl" className="top-menu">
            <NavbarBrand href='#' onClick={e => navigate('/')} className='mr-auto site-logo'>
                <img src={logo} alt="logo" className="top-menu-logo"/>
            </NavbarBrand>
            <NavbarToggler onClick={e => pullMenu(!menuPulled)} className="dark"/>
            <Collapse isOpen={menuPulled} navbar>
                <Nav className="m-auto" navbar>
                    {items.map((item, i) => {
                        if (item.hidden) return <span key={i}></span>;
                        return item.items ? <UncontrolledDropdown nav inNavbar key={i}>
                                <DropdownToggle nav caret>
                                    {item.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {item.items.map((itemSub, i) => {
                                        const ps = itemSub.path ? {href: itemSub.path} : itemSub.onClick ? {href: '#', onClick: itemSub.onClick} : null
                                        return <DropdownItem key={i} disabled={!ps}>
                                            {ps ? <A {...ps} className={itemSub.className}>{itemSub.label}</A> : itemSub.label}
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            :
                            <NavItem key={i} active={isActive(item.path)}>
                                <A href={item.path || '#'} onClick={item.onClick} className={'nav-link'}>{item.label}</A>
                            </NavItem>
                    })}
                </Nav>
            </Collapse>
        </Navbar>
    </div>
}

