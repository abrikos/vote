import React, {useEffect, useState} from "react";
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";
import {A} from "hookrouter"

export default function (props) {
    const [value, setValue] = useState([])
    //const [selected, setSelected] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const list = props.list;
    useEffect(() => {
        setValue(props.value)
    }, [])

    function selectValues(e) {
        const vals = [];
        for (const o of e.target.options) {
            if (o.selected) vals.push(list.find(m => m.id === o.value))
        }
        //setSelected(vals)
        const currValue = [...value];
        setValue(currValue.concat(vals))
        toggle()
    }

    function remove(id) {
        setValue(value.filter(v => v.id !== id))
    }

    return <div className="input-has-many">
        {!props.field.options.readOnly && <select size={20} multiple={true} name={props.field.name} value={value.map(v => v.id)} hidden readOnly>
            {value.map((item, i) => <option key={i} value={item.id}> {item[props.field.options.property]} </option>)}
        </select>}

        <div className="items-attached">
            {value.map((item, i) => <span key={i} className="has-many-item">
                <A href={`/admin/${props.field.options.ref.toLowerCase()}/${item.id}/update`}>{item[props.field.options.property]}</A>
                {!props.field.options.readOnly && <span className="hasMany-remove">
                    <input type="checkbox" onChange={() => remove(item.id)} checked/>
                </span>}
            </span>)}
        </div>
        {!props.field.options.readOnly && <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret size="sm">
                Выбрать
            </DropdownToggle>
            <DropdownMenu>

                <select size={20} multiple={true} onChange={selectValues} name="hasManyItems">{list.filter(l => !value.map(v => v.id).includes(l.id)).map(l => <option key={l.id} value={l.id}>{l[props.field.options.property]}</option>)}</select>
                {/*<Button size="sm" onClick={addHasMany}>Добавить</Button>*/}

            </DropdownMenu>
        </Dropdown>}

    </div>
}
