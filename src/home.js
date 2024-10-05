import * as React from 'react'
import { VersionCard } from './components/VersionCard'

const logfile = require('../updatelog.json') // should be requested instead of imported, will update when logfile is hosted

const reorderLog = (logOrder, reorder, updateOrderName) => {
    let newOrder
    if (logOrder === 'recent') {
        newOrder = Object.keys(logfile.versions).reverse()
    } else if (logOrder === 'major') {
        newOrder = Object.keys(logfile.versions).reverse().filter(version => !!logfile.versions[version].title)
    } else {
        newOrder = Object.keys(logfile.versions)
    }

    updateOrderName(logOrder)

    if (reorder) { 
        reorder(newOrder)
    } else {
        return newOrder
    }
}

const search = (query, reorder, orderName, updateOrderName) => {
    const originalOrder = reorderLog(orderName, false, updateOrderName)
    
    const newOrder = originalOrder.filter(version => {
        const {title, date, description} = logfile.versions[version]
        return version.includes(query) ||
                title.includes(query) ||
                date.includes(query) ||
                description.includes(query)
    })

    reorder(newOrder)
}

export const Home = () => {

    const [logOrder, reorder] = React.useState([])
    const [orderName, updateOrderName] = React.useState('recent')

    React.useEffect(() => { reorderLog('recent', reorder, updateOrderName)}, [reorder])

    return <>
        <div className='bgGradient'></div>
        <h1>The Emeryverse! Changelog</h1>
        <div className='sortRow'>
            <div className='sortDropdown'>
                <div>Search: </div>
                <input type="text" placeholder='Search' className='searchBar' onChange={(e) => {search(e.target.value, reorder, orderName, updateOrderName)}}/>
                <select onChange={(e) => {reorderLog(e.target.value, reorder, updateOrderName)}}>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="major">Major Releases</option>
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