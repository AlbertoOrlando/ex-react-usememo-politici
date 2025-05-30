import React, { useState, useEffect, useMemo, memo } from 'react'
import './App.css'


function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState('')

  const fetchPoliticians = async () => {
    const response = await fetch('http://localhost:5050/politicians')
    const data = await response.json()
    return data
  }

  useEffect(() => {
    fetchPoliticians().then(setPoliticians)
  }, [])

  const filteredPoliticians = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    return politicians.filter(
      p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.biography.toLowerCase().includes(lowerSearch)
    )
  }, [politicians, search])

  const PoliticianCard = memo(function PoliticianCard({ politician }) {
    console.log('Render Card:', politician.name)
    return (
      <div className='politician'>
        <p className='politician_name'>{politician.name}</p>
        <img className='politician_img' src={politician.image} alt={politician.name} />
        <p className='politician_position'>{politician.position}</p>
        <p className='politician_bio'>{politician.biography}</p>
      </div>
    )
  })

  return (
    <>
      <h1>Politicians</h1>
      <h2 className='h2_title'>Politician List</h2>
      <input
        type="text"
        placeholder='cerca il politico'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className='politician-list' >
        {filteredPoliticians.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </>
  )
}


export default App
