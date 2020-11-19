import React, { Component } from 'react';
import ojoVerNoticia from 'assets/images/ojoVerNoticia.png';
import { Link } from 'react-router-dom';

class Table extends Component {

    render() {

        return (
            <div>
                <table className="tableNews">
                    {/* <tbody>
                        <tr>
                            <th>Titulo</th>
                            <th>Fecha de creación</th>
                            <th>Autor</th>
                            <th></th>
        </tr>*/}
                    <tr>
                        <td className="columnTable">
                            {this.props.title}
                        </td>
                        <td className="columnTable">
                            {this.props.date}
                        </td>
                        <td className="columnTable">
                            {this.props.author}
                        </td>
                        <td className="lastColumnTable">
                            <Link className="seeNews" to={this.props.linktonews}>
                                <img className="seeNews" src={ojoVerNoticia}></img>
                            </Link>
                        </td>
                    </tr>
                    { /* </tbody>*/}
                </table>
            </div>

        );

    }

}
export default Table;