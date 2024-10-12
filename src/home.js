import * as React from 'react'
import { VersionCard } from './components/VersionCard'

const logfile = require('../dist/updatelog.json')

const fetchLog = async (setLogfile) => {
    try {
        const response = await fetch('updatelog.json')
        const data = await response.json()
        console.log('found update log')
        setLogfile(data)
    } catch (e) {
        console.log('failed to grab logfile, using backup logfile', e)
        setLogfile(logfile)
    }
}

const reorderLog = (logFile, logOrder, reorder, updateOrderName) => {
    if (!logFile) return

    let newOrder
    if (logOrder === 'recent') {
        newOrder = Object.keys(logFile.versions).reverse()
    } else if (logOrder === 'major') {
        newOrder = Object.keys(logFile.versions).reverse().filter(version => !!logFile.versions[version].title)
    } else {
        newOrder = Object.keys(logFile.versions)
    }

    updateOrderName(logOrder)

    if (reorder) { 
        reorder(newOrder)
    } else {
        return newOrder
    }
}

const search = (logFile, query, reorder, orderName, updateOrderName) => {
    if (!logFile) return

    const originalOrder = reorderLog(logFile, orderName, false, updateOrderName)
    
    const newOrder = originalOrder.filter(version => {
        const {title, date, description} = logFile.versions[version]
        return version.includes(query) ||
                title.includes(query) ||
                date.includes(query) ||
                description.includes(query)
    })

    reorder(newOrder)
}

export const Home = () => {

    const [logFile, setLogfile] = React.useState(void 0)
    const [logOrder, reorder] = React.useState([])
    const [orderName, updateOrderName] = React.useState('recent')

    React.useEffect(() => { fetchLog(setLogfile) }, [setLogfile])
    React.useEffect(() => { reorderLog(logFile, 'recent', reorder, updateOrderName)}, [logFile])

    return <>
        <div className='bgGradient'></div>
        <h1>The Emeryverse! Changelog</h1>
        <div className='sortRow'>
            <div className='sortArea'>
                <div>Search: </div>
                <input type="text" placeholder='Search' className='searchBar' onChange={(e) => {search(logFile, e.target.value, reorder, orderName, updateOrderName)}}/>
                <select className='sortDropdown' onChange={(e) => {reorderLog(logFile, e.target.value, reorder, updateOrderName)}}>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="major">Major Releases</option>
                </select>
                <div className='sortDropdownIcon'>
                    <div className="upArrow">{'\u25bf'}</div>
                    <div>{'\u25bf'}</div>
                </div>
            </div>
        </div>
        <div className="versionsRow">
        {
            logOrder.map(version => <VersionCard key={version} version={version} info={logFile.versions[version]} />)
        }
        </div>
    </>
}