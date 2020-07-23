import React from 'react';
import Link from "next/link";

export default function Logo() {
    return (
        <Link as='/' href={{pathname: '/studentsList'}}>
            <a className="logo header">
                <img className="logo__image"
                     src="https://vectr.com/pkononsky/bP6voKdYi.svg?width=640&height=640&select=bP6voKdYipage0"
                     alt="logo image"/>
                <p className="logo__text">
                    STUDENTS
                </p>
            </a>
        </Link>
    )
}
