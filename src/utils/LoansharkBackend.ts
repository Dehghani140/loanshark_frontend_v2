import { request, gql } from "graphql-request"

export function borrowBTC(address, hash, userHealthRatioBefore, userHealthRatioAfter, amount, price) {

    var date = new Date();
    const query = gql`
    mutation {
        createPost( 
          data: {
                    title: "Borrow BTC",
                    account: "${address}",
                    content: "${hash}",
                    borrowingPosition: "ETH/BTC", 
                    healthFactor: "${userHealthRatioBefore}",
                    actionType: "Borrow BTC",
                    amount: "${amount} BTC",
                    value: "$${Number(amount * price / 100).toFixed(2)}",
                    newHealthFactor: "${userHealthRatioAfter}",
                    publishDate: "${date.toISOString()}"
              }
        ) {
          id
        }
      }
    `

    request('https://backend.loanshark.tech/api/graphql/', query).then(
        (data) => console.log(data)
    )
}

export function repayBTC(address, hash, userHealthRatioBefore, userHealthRatioAfter, amount, price) {

    var date = new Date();
    const query = gql`
    mutation {
        createPost( 
          data: {
                    title: "Repay BTC",
                    account: "${address}",
                    content: "${hash}",
                    borrowingPosition: "ETH/BTC", 
                    healthFactor: "${userHealthRatioBefore}",
                    actionType: "Repay BTC",
                    amount: "${amount} BTC",
                    value: "$${Number(amount * price / 100).toFixed(2)}",
                    newHealthFactor: "${userHealthRatioAfter}",
                    publishDate: "${date.toISOString()}"
              }
        ) {
          id
        }
      }
    `

    request('https://backend.loanshark.tech/api/graphql/', query).then(
        (data) => console.log(data)
    )
}

export function depositETH(address, hash, userHealthRatioBefore, userHealthRatioAfter, amount, price) {

    var date = new Date();
    const query = gql`
    mutation {
        createPost( 
          data: {
                    title: "Deposit ETH",
                    account: "${address}",
                    content: "${hash}",
                    borrowingPosition: "ETH/BTC", 
                    healthFactor: "${userHealthRatioBefore}",
                    actionType: "Deposit ETH",
                    amount: "${amount} ETH",
                    value: "$${Number(amount * price / 100).toFixed(2)}",
                    newHealthFactor: "${userHealthRatioAfter}",
                    publishDate: "${date.toISOString()}"
              }
        ) {
          id
        }
      }
    `

    request('https://backend.loanshark.tech/api/graphql/', query).then(
        (data) => console.log(data)
    )
}

export function withdrawETH(address, hash, userHealthRatioBefore, userHealthRatioAfter, amount, price) {

    var date = new Date();
    const query = gql`
    mutation {
        createPost( 
          data: {
                    title: "Withdraw ETH",
                    account: "${address}",
                    content: "${hash}",
                    borrowingPosition: "ETH/BTC", 
                    healthFactor: "${userHealthRatioBefore}",
                    actionType: "Withdraw ETH",
                    amount: "${amount} ETH",
                    value: "$${Number(amount * price / 100).toFixed(2)}",
                    newHealthFactor: "${userHealthRatioAfter}",
                    publishDate: "${date.toISOString()}"
              }
        ) {
          id
        }
      }
    `

    request('https://backend.loanshark.tech/api/graphql/', query).then(
        (data) => console.log(data)
    )
}