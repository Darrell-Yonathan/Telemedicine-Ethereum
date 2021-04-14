import React , {Fragment} from 'react'

const Navbar = ({account}) => {
    return (
        <Fragment>
                      <nav className="navbar navbar-expand-lg navbar-light bg-info">
              <a className="navbar-brand text-white" href="#!">IPFS Upload Dapp</a>
              <button className="navbar-toggler bg-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item  active">
                    <a className="nav-link text-white" href="#!">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item  text-white">
                    <a className="nav-link text-white" href="#!">Link</a>
                  </li>
                  <li className="nav-item  dropdown">
                    <a className="nav-link text-white dropdown-toggle" href="#!" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#!">Action</a>
                      <a className="dropdown-item" href="#!">Another action</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#!">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a className="nav-link text-white " href="#!" tabIndex={-1} aria-disabled="true">{account}</a>
                  </li>
                </ul>
              </div>
            </nav>

        </Fragment>
       
              
    )
}

export default Navbar
