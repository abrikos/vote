import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarToggler, NavItem, UncontrolledDropdown} from "reactstrap";
import {A, navigate, usePath} from "hookrouter";
import React, {useState} from "react";

export default function (props) {
    const [menuPulled, pullMenu] = useState(false);
    const currentPath = usePath();
    function isActive(path) {
        return path === currentPath;
    }


    const userMenu = [
        {label: `${(props.authenticatedUser && props.authenticatedUser.displayName)}`, items:[
                {label: 'ADMIN', path: '/admin/post', hidden: !(props.authenticatedUser && props.authenticatedUser.admin)},
                {label: 'Кабинет', path: '/cabinet'},
                {label: 'Выход', onClick: props.logOut, hidden: !props.authenticatedUser},
            ], hidden: !props.authenticatedUser},
        //{label: 'Вход', path: '/login', hidden: props.authenticatedUser},
        {label: 'Вход', onClick:()=>{props.updateReturnUrl(window.location.pathname); navigate('/login')}, pathX: '/login?xx', hidden: props.authenticatedUser},
    ]

    return <Navbar light expand="xl" className="top-menu">
        <NavbarToggler onClick={e => pullMenu(!menuPulled)} className="dark"/>
        <Collapse isOpen={menuPulled} navbar>
            <Nav className="m-auto" navbar>
                {userMenu.map((item, i) => {
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


                {/*<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Language')}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => langSwitch('ru')}>
                                    RU
                                </DropdownItem>
                                <DropdownItem onClick={() => langSwitch('en')}>
                                    EN
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>*/}

            </Nav>
        </Collapse>
    </Navbar>
}
