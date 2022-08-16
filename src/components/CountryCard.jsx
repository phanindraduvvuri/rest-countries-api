import { Link } from 'react-router-dom';


function CountryCard(props) {

    const { code, flag, name, population, capital, region } = props

    return (
        <div className="country">
            <img src={flag} alt="name" className="country__flag" />
            <div className="country__details">
                <Link to={`/details/${code}`} style={{ textDecoration: 'none' }}>
                    <h3 className="name">{name}</h3>
                </Link>
                <p><strong>Population</strong>: {population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p><strong>Region</strong>: {region}</p>
                <p><strong>Capital</strong>: {capital}</p>
            </div>
        </div>
    )
}

export default CountryCard
