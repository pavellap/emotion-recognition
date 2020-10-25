import React from 'react'
import '../Styles/Footer.scss'

export default function () {
    return (
        <footer>
            <div>
                <h3>Information</h3>
                <p>This project was created as a course project of second year of bachelor degree in Moscow
                Institute of Electronics and Mathematics of Higher School of Economics university.<br/>
                    <span>Feel free to contact authors.</span>
                </p>
            </div>
            <div>
                <h3>Frontend and backend</h3>
                <ul>
                    <li>Author: Pavel Lapshin</li>
                    <li>E-mail: <a href='mailto:trigognight@gmail.com'>trigognight@gmail.com</a></li>
                    <li>Telegram: <a href="https://t.me/trigognight">@trigognight</a></li>
                </ul>
            </div>
            <div>
                <h3>Machine Learning</h3>
                <ul>
                    <li>Author: Evgeniy Kayatovsky</li>
                    <li>E-mail: <a href='mailto:evkayatovskiy@edu.hse.ru'>evkayatovskiy@edu.hse.ru</a></li>
                    <li>VK: <a href="https://vk.com/kayatovsky">@kayatovsky</a></li>
                </ul>
            </div>
        </footer>
    )
}