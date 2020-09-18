import { apiService, storageService } from '../services';
import { environment } from '../environment';



const postcouponCode = (couponCode) => {
    return apiService.post('addBalance', {coupon_code:couponCode})
    .then( response => {
        if(response.data.status == 'success'){
            return response
        } else {
            return response
        }
    })
}

const getTransactionHistory = () => {
    return apiService.get('recentTransaction')
    .then ( response => {
        return response
    })
}

const settlement = (amount) => {
    return apiService.post('settlement', {amount: amount})
    .then( response => {
        return response;
    });
}

const getProducts = () => {
    return apiService.get('pg/getProducts')
    .then( response => {
        return response;
    })
}

const getBanks = () => {
    return apiService.get('pg/bankList')
    .then(response => {
        return response;
    });
}

const getWallets = () => {
    return apiService.get('pg/wallets')
    .then(response => {
        return response;
    })
}

const txnInitNB = (params) => {
    return apiService.get('/pg/txn/init?amount='+params.amount+'&app_name='+environment.APP_NAME+'&bank_code='+params.bank_code+'&pg='+params.code+'&product_id='+params.id+'&referrer='+params.referrer+'&redirect_url'+params.redirect_url+'&source=web')
    .then( response => {
        return response;
    })
}

const pay1StoreList = (lat=0, long=0) => {
    let url = 'cash-drop/store-locator';
    let params = {
        lat:lat,
        long:long,
        service_id: environment.SERVICE_LIST.CASH_DROP.ID
    }
    return apiService.post(url, params)
    .then( response => {
        return response;
    })
}

const agentDetailsByMobile = (mobile) => {
    let url = 'cash-drop/retailer-details';
    let params = {
        agent_mobile: mobile
    };

    // return apiService.extPostRequest(url, params)
    return apiService.post(url, params)
    .then( response => {
        return response;
    })
}

const agentDetailsByQRCode = (qrcode) => {
    let url = 'cash-drop/retailer-details';
    let params = {
        agent_qr: qrcode
    };

    // return apiService.extPostRequest(url, params)
    return apiService.post(url, params)
    .then( response => {
        return response;
    })
}

const cashDropTransactionInit = (params) =>{
    console.log(params);
    let url = 'cash-drop/generate-txn';
    return apiService.post(url, params)
    .then(response => {
        return response;
    })
}

const cashDropTxnStatusCheck = (txn_id) =>{
    let url = 'transaction-status';
    let params = {
        txn_id: txn_id
    }
    return apiService.post(url, params)
    .then(response => {
        return response;
    })
}

export const walletService = {
    postcouponCode,
    getTransactionHistory,
    settlement,
    getProducts,
    getBanks,
    getWallets,
    txnInitNB,
    pay1StoreList,
    agentDetailsByMobile,
    agentDetailsByQRCode,
    cashDropTransactionInit,
    cashDropTxnStatusCheck
}