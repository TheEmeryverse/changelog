import * as React from 'react'
import { VersionCard } from './components/VersionCard'

const logfile = require('../updatelog.json')

const reorderLog = (order, reorder) => {
    if (order === 'recent') {
        reorder(Object.keys(logfile.versions).reverse())
    } else if (order === 'major') {
        reorder(Object.keys(logfile.versions).reverse().filter(version => !!logfile.versions[version].title))
    } else {
        reorder(Object.keys(logfile.versions))
    }
}

export const Home = () => {

    const [logOrder, reorder] = React.useState([])

    React.useEffect(() => { reorderLog('recent', reorder)}, [reorder])

    return <>
        <div className='bgGradient'></div>
        <h1>The Emeryverse! Changelog</h1>
        <div className='sortRow'>
            <div></div>
            <div className='sortDropdown'>
                <div>Sort: </div>
                <select onChange={(e) => {reorderLog(e.target.value, reorder)}}>
                    <option value="recent">Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="major">Major</option>
                </select>
            </div>
        </div>
        <div className="versionsRow">
        {
            logOrder.map(version => <VersionCard key={version} version={version} info={logfile.versions[version]} />)
        }
        </div>
    </>
}