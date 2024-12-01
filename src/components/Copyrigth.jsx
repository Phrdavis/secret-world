import './Copyrigth.css'

const Copyrigth = ({ano, nome}) => {

    return (

        <div className="copyContainer">

            <p>&copy; {ano} - {nome}</p>

        </div>

    )

}

export default Copyrigth;