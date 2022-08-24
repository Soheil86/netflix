import React from 'react'
import Banner from '../Banner'
import './HomeScreen.css'
import Nav from '../Nav'
import requests from '../Requests'
import Row from '../Row'

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      {/* <Row title='Trending Now' fetchUrl={requests.fetchTrending} /> */}
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Documentry' fetchUrl={requests.fetchDocumentaries} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
    </div>
  )
}

export default HomeScreen
