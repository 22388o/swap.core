import React, { Fragment, Component } from 'react'
import app from '../../swapApp'


export default class Orders extends Component {

  constructor() {
    super()

    this.state = {
      orders: app.orders.items,
    }
  }

  componentWillMount() {
    app.orders.on('new orders', this.updateOrders)
    app.orders.on('new order', this.updateOrders)
    app.orders.on('remove order', this.updateOrders)
    app.orders.on('order update', this.updateOrders)
    app.orders.on('new order request', this.handleRequest)
  }

  componentWillUnmount() {
    app.orders.off('new orders', this.updateOrders)
    app.orders.off('new order', this.updateOrders)
    app.orders.off('remove order', this.updateOrders)
    app.orders.off('order update', this.updateOrders)
    app.orders.off('new order request', this.handleRequest)
  }

  updateOrders = () => {
    this.setState({
      orders: app.orders.items,
    })
  }

  handleRequest = ({ orderId, participant }) => {
    this.updateOrders()
  }

  createOrder = () => {
    const data = {
      buyCurrency: 'ETHTOKEN',
      sellCurrency: 'BTC',
      buyAmount: 1,
      sellAmount: 0.001,
    }

    app.orders.create(data)
    this.updateOrders()
  }

  removeOrder = (orderId) => {
    app.orders.remove(orderId)
    this.updateOrders()
  }

  sendRequest = (orderId) => {
    const order = app.orders.getByKey(orderId)

    order.sendRequest((isAccepted) => {
      console.log(`user ${order.owner.peer} ${isAccepted ? 'accepted' : 'declined'} your request`)

      this.handleOrderSelect(orderId)
    })
    this.updateOrders()
  }

  acceptRequest = (orderId, participantPeer) => {
    const order = app.orders.getByKey(orderId)

    order.acceptRequest(participantPeer)
    this.handleOrderSelect(orderId)
    this.updateOrders()
  }

  declineRequest = (orderId, participantPeer) => {
    const order = app.orders.getByKey(orderId)

    order.declineRequest(participantPeer)
    this.updateOrders()
  }

  handleOrderSelect = (swapId) => {
    const { onOrderSelect } = this.props

    onOrderSelect(swapId)
  }

  render() {
    const { orders } = this.state
    const { myPeer, activeOrderId } = this.props

    console.log('orders', orders)

    return (
      <div>
        <button onClick={this.createOrder}>Create Order</button>
        <br /><br />
        {
          Boolean(orders && orders.length) && (
            <table>
              <thead>
                <tr>
                  <th>Exchange Rate</th>
                  <th>User Reputation</th>
                  <th>{orders[0].sellCurrency.toUpperCase()}</th>
                  <th>{orders[0].buyCurrency.toUpperCase()}</th>
                  <th width="1%" colSpan="2" />
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((swap) => {
                    const {
                      id, buyAmount, sellAmount, exchangeRate, requests, isRequested, isProcessing,
                      owner: { peer: ownerPeer, reputation },
                    } = swap

                    return (
                      <tr key={id} style={{ backgroundColor: myPeer === ownerPeer ? '#fff4d5' : '' }}>
                        <td>{exchangeRate}</td>
                        <td>{reputation}</td>
                        <td>{sellAmount}</td>
                        <td>{buyAmount}</td>
                        {
                          isProcessing ? (
                            <td>
                              <div style={{ color: 'red' }}>PROCESSING</div>
                              {
                                activeOrderId !== id && (
                                  <button onClick={() => this.handleOrderSelect(id)}>OPEN</button>
                                )
                              }
                            </td>
                          ) : (
                            <td>
                              {
                                myPeer === ownerPeer ? (
                                  <Fragment>
                                    {
                                      Boolean(requests && requests.length) ? (
                                        <Fragment>
                                          {
                                            requests.map(({ peer, reputation }) => (
                                              <div key={peer}>
                                                User {peer} with <b>{reputation}</b> reputation wants to swap.
                                                <button onClick={() => this.acceptRequest(id, peer)}>ACCEPT</button>
                                                <button onClick={() => this.declineRequest(id, peer)}>DECLINE</button>
                                              </div>
                                            ))
                                          }
                                        </Fragment>
                                      ) : (
                                        <button onClick={() => this.removeOrder(id)}>REMOVE</button>
                                      )
                                    }
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    {
                                      isRequested ? (
                                        <div style={{ color: 'red' }}>REQUESTING</div>
                                      ) : (
                                        <button onClick={() => this.sendRequest(id)}>BUY</button>
                                      )
                                    }
                                  </Fragment>
                                )
                              }
                            </td>
                          )
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    )
  }
}
