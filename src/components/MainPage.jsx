import 'font-awesome/scss/font-awesome.scss';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import CountryCard from './CountryCard';
import Loading from './Loading';

export const BASE_URL = "https://restcountries.com/v3.1/";


function MainPage() {
  const [search, setSearch] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext)

  useEffect(() => {
    setLoading(true);

    // if (region.length == 0)
    //   URL = `${BASE_URL}all?fields=name,capital,region,population,flags,cca3`;
    //   else {
    //     URL = `${BASE_URL}region/${region}?fields=name,capital,region,population,flags,cca3`;
    //     console.log('other url')
    //   }
    URL = `${BASE_URL}all?fields=name,capital,region,population,flags,cca3`;

    fetch(URL)
      .then(res => res.json())
      .then(data => setAllCountries(data))
      .finally(() => setLoading(false));


  }, []);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSelect(event) {
    console.log(event.target.value)
    setRegion(event.target.value);
  }

  console.log(region)

  const countries = allCountries.filter((country) => {

    if (region.length === 0) {
      return true;
    }
    if (country.region.toLowerCase() === region) {
      return true
    }
    return false
  })
    .filter((country) => {
      if (!search) return true;  // If no search term return all countries
      if (country.name.official.toLowerCase().indexOf(search) !== -1) return true;  //  if the country name contains search term return only that countries
      else return false;
    })
    .map((country, index) => {
      let flag = country.flags.svg;
      let name = country.name.official;
      let population = country.population;
      let region = country.region;
      let capital = country.capital.join(", ");
      let code = country.cca3;

      return (
        <CountryCard key={index} code={code} flag={flag} name={name} population={population} region={region} capital={capital} />
      )
    })



  return (
    !loading ?
      <>
        <div className="search-filter">
          <form className="searchbox" onSubmit={(event) => event.preventDefault()}>
            <box-icon name='search' color={theme.theme === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'}></box-icon>
            <input type="text" onChange={handleSearch} value={search} placeholder='Search for a country...' autoComplete='off' />
          </form>
          <div className="filterbox">
            <select value={region} name="filter" id="filter" onChange={handleSelect}>
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="americas">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </div>

        <div className="countries-grid">
          {countries}
        </div>
      </>
      :
      <Loading />
  )
}

export default MainPage;
