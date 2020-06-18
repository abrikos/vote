import React from "react";
import "client/pages/contacts/contacts.sass";
import Phone from "client/components/Phone";
import Email from "client/components/Email";


export default function Contacts(props) {


    return <div>


        <h1 className="my-5">Приемная АН РС(Я)</h1>
        <div className="my-5">
            <div>Если у вас есть возможность не загружать телефонный трафик, пожалуйста, отправьте ваш вопрос на почту</div>
            <a href="mailto:secretary@yakutia.science" target="_blank" rel="noopener noreferrer" className="btn btn-light">Напишите нам <img src="/bullet.svg" alt="Bullet" width={20}/></a>
        </div>
        <div className="contact-row my-5">
            <div className="contact-col">
                <h3>Мы рядом</h3>
                Академия Наук РС(Я)
                Пр-т Ленина, 33, Якутск
                <div className="row">
                    <div className="col">Телефон</div>
                    <div className="col"><Phone phone={'+7(4112) 33-57-11'}/></div>
                </div>
                <div className="row">
                    <div className="col">Факс</div>
                    <div className="col">+7(4112) 33-57-10</div>
                </div>
                <div className="row">
                    <div className="col">Электронная почта</div>
                    <div className="col"><Email email={'secretary@yakutia.science'}/></div>
                </div>

            </div>

            <div className="contact-col">
                <h3>Время работы</h3>
                <div className="row">
                    <div className="col">ПН - ПТ</div>
                    <div className="col">09:00 - 18:00</div>
                </div>
                <div className="row">
                    <div className="col">СБ/ВС</div>
                    <div className="col">Выходной</div>
                </div>
            </div>

            <div className="contact-col">
                <h3>Пресс-служба</h3>
                <div className="row">
                    <div className="col">Мобильный</div>
                    <div className="col"><Phone phone={'+7(924) 170-00-12'}/></div>
                </div>
                <div className="row">
                    <div className="col">Телефон</div>
                    <div className="col"><Phone phone={'+7(4112) 39-06-62'}/></div>
                </div>
                <div className="row">
                    <div className="col">Электронная почта</div>
                    <div className="col"><Email email={'a.koryakina@yakutia.science'}/></div>
                </div>

            </div>
        </div>

        <iframe src="/2gis.html" className="iframe-2gis" title="2gis"/>

    </div>
}
