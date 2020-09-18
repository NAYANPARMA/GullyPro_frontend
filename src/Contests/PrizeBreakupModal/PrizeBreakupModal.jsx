import React, { Component } from 'react';
import '../contests.scss';
import Modal, { modalShow } from '../../common/Modal/Modal';

export class PrizeBreakupModal extends Component {
    render() {
        return (
            <Modal>
                <div className="modal-header">
                    <div className="col-12">
                        <button type="button" className="close-j" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" onClick={() => modalShow()}><img src="/images/close-white.png" /></span>
                        </button>
                    </div>
                    <div className="col-12">
                        <div className="model-patch">
                            <div className="top-prize-j">
                                <p>Prize Money</p>
                                <h3>₹750</h3>
                            </div>
                        </div>
                        <div className="middel-prize-j">
                            <div className="Participation-j">
                                <p>Participation </p>
                                <p>34 / 40</p>
                            </div>
                            <div className="entry-j">
                                <p>Entry </p>
                                <p style={{float: 'right'}}>₹13 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="col-12">
                        <div className="rank-j">
                            <table width="100%">
                                <thead>
                                    <tr rowSpan="4">
                                        <th className="model-heasding1">Prize Distribution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="rank-no-j">Rank 1</td>
                                        <td className="rank-prise-j">₹ 100</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j">Rank 2</td>
                                        <td className="rank-prise-j">₹ 49</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j">Rank 3</td>
                                        <td className="rank-prise-j"> ₹ 40</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j">Rank 4 - 5</td>
                                        <td className="rank-prise-j">₹ 35</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j"> Rank 6 - 7</td>
                                        <td className="rank-prise-j">₹ 30</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j"> Rank 8 - 12</td>
                                        <td className="rank-prise-j">₹ 20</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j"> Rank 13 - 18</td>
                                        <td className="rank-prise-j">₹ 15</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j">   Rank 19 - 25 </td>
                                        <td className="rank-prise-j">₹ 13</td>
                                    </tr>
                                    <tr>
                                        <td className="rank-no-j"> Rank 26 - 40</td>
                                        <td className="rank-prise-j">₹ 10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PrizeBreakupModal
