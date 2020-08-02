import React, {Fragment} from 'react';
import Link from "next/link";

export default function Logo() {
    return (
        <div className="logo__block header">
            <Link as='/' href={{pathname: '/studentsList'}}>
                <a className="logo">
                    <img className="logo__image"
                         src="https://vectr.com/pkononsky/bP6voKdYi.svg?width=640&height=640&select=bP6voKdYipage0"
                         alt="logo image"/>
                    <p className="logo__text">
                        STUDENTS
                    </p>
                </a>
            </Link>
            <p className='logo__by'>
                by
            </p>
            <a href="https://github.com/Pkononsky/doubletapp-test-task" className='logo__git-ref'>
                Pkononsky
            </a>
        </div>
    )
}
