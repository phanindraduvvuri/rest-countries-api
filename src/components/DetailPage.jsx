import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../App';
import Loading from './Loading';
import { BASE_URL } from './MainPage';

function DetailPage() {
    let c_code = useParams().ccode;

    let theme = useContext(ThemeContext)

    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let URL = `${BASE_URL}alpha/${c_code}`

        setLoading(true);

        fetch(URL)
            .then(res => res.json())
            .then(data => setCountry(data[0]))
            .finally(() => setLoading(false))

    }, [c_code])


    return (
        (!loading) ?
            <>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="back-btn">
                        <box-icon
                            name='arrow-back'
                            color={theme.theme === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)'}
                        ></box-icon>

                        <p>Home</p>
                    </button>
                </Link>
                <div className="detail-container">
                    <img src={country.flags.svg} alt={country.name.official} />
                    <div className="details">
                        <h2>{country.name.official}</h2>
                        <div id="text-details">
                            <div className="main-details">
                                <p><strong>Native Name:</strong> {country.name.common}</p>
                                <p><strong>Population:</strong> {country.population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                                <p><strong>Region:</strong> {country.region}</p>
                                <p><strong>Sub Region:</strong> {country.subregion}</p>
                                <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
                            </div>
                            <div className="add-details">
                                <p><strong>Top Level Domain: </strong>{country.tld}</p>
                                <p><strong>Currencies: </strong>{Object.keys(country.currencies).map(currency => country.currencies[currency].name).join(', ')}</p>
                                <p><strong>Languages: </strong>{Object.values(country.languages).join(', ')}</p>
                            </div>
                        </div>
                        <div className="border-countries">
                            <h3>Border Countries:</h3>
                            <div className="country-buttons">
                                {country.borders ? Object.values(country.borders).map(border => (
                                    <Link to={`/details/${border}`}><button onClick={() => (setCountryCode(border))} key={border} className="border">{border}</button></Link>
                                )) : <h4>No border countries</h4>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <Loading />

    )
}

export default DetailPage;
