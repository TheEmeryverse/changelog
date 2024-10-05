import * as React from 'react'

export const VersionCard = (props) => {
    const { version, info } = props
    return <div className='versionCard'>
        <div className='versionHeader'>
            <div className="versionTitle">
                {version}
                { info.title ? ` – ${info.title}`: ''}
            </div>
            <div className="versionDate">{info.date}</div>
        </div>
        <p>{info.description}</p>
    </div>
}