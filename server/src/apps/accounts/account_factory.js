const { CHEF, CUSTOMER } = require("../../constants/app_constants");
const Chef = require("../profiles/chef/schema/chef");
const Customer = require("../profiles/customer/schema/customer");
const Account = require("./schema/account");

class AccountFactory {
    static getAccount(type, data) {
        switch (type) {
            case CHEF:
                let chefAccount = new Account(data);
                chefAccount.set({ type: CHEF, profile: new Chef(data) });
                return chefAccount;
            case CUSTOMER:
                let customerAccount = new Account(data);
                customerAccount.set({ type: CUSTOMER, profile: new Customer(data) })
                return customerAccount;
        }
    }
}

module.exports = AccountFactory;