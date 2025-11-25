export default CheckScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [checkType, setCheckType] = useState("aadhaar");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isEnabled = Math.random() > 0.5;
      setResult({
        isEnabled,
        account: inputValue,
        bank: "State Bank of India",
        lastUpdated: "2 days ago",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("checkscreen.title")}
        </h2>
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Check Your DBT Status
        </h2> */}
        <p className="text-gray-600">{t("checkscreen.subtitle")}</p>
        {/* <p className="text-gray-600">
          Verify if your bank account can receive Direct Benefit Transfers
        </p> */}
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("checkscreen.enter_details")}
        </h3>
        {/* <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Enter Your Details
        </h3> */}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("checkscreen.checkusing")}
            </label>
            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
              Check using:
            </label> */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCheckType("aadhaar")}
                className={`px-4 py-2 rounded-lg border ${
                  checkType === "aadhaar"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {t("checkscreen.aadhar")}
              </button>
              <button
                onClick={() => setCheckType("account")}
                className={`px-4 py-2 rounded-lg border ${
                  checkType === "account"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {t("checkscreen.account")}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {checkType === "aadhaar"
                ? t("checkscreen.aadhar")
                : t("checkscreen.account")}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                checkType === "aadhaar" ? "1234 5678 9012" : "1234567890123456"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={!inputValue || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? t("checkscreen.buttonpressed") : t("checkscreen.button")}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t("checkscreen.resultsuccess.congo")}
          </h3>

          <div
            className={`rounded-xl p-6 ${
              result.isEnabled
                ? "bg-green-50 border-2 border-green-200"
                : "bg-red-50 border-2 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-4">
              {result.isEnabled ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-600" />
              )}

              <div className="flex-grow">
                <h4
                  className={`text-xl font-bold mb-2 ${
                    result.isEnabled ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.isEnabled
                    ? t("checkscreen.resultsuccess.congo")
                    : t("checkscreen.resultfailure.failure")}
                </h4>

                <p
                  className={`mb-4 ${
                    result.isEnabled ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.isEnabled
                    ? t("checkscreen.resultsuccess.subline")
                    : t("checkscreen.resultfailure.subline")}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>{t("checkscreen.resultsuccess.bank")}</strong>{" "}
                    {result.bank}
                  </p>
                  <p>
                    <strong>
                      {t("checkscreen.resultsuccess.lastupdated")}
                    </strong>{" "}
                    {result.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!result.isEnabled && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                {t("checkscreen.resultfailure.howtoenable")}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step1")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step2")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step3")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step4")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
        <p className="text-sm text-yellow-700 mb-4">
          If you're having trouble checking your status or need assistance with
          DBT seeding:
        </p>
        <div className="flex space-x-4">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
            Contact Bank
          </button>
          <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};