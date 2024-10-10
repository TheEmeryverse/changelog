import * as React from 'react'

export const VersionCard = (props) => {
    const { version, info } = props
    const date = info.date ? new Date(info.date) : void 0
    return <div className='versionCard'>
        <div className='versionHeader'>
            <div className="versionTitle">
                <span className='versionNumber'>{version}</span>
                { info.title ? ` – ${info.title}`: ''}
            </div>
            <div className="versionDate">{date ? date.toDateString() : ''}</div>
        </div>
        <p>{info.description}</p>
    </div>
}