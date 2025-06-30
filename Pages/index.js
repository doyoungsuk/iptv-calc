import { useState } from 'react';

const telecomPlans = {
  SK: {
    Economy: { channels: 183, price: 8800, noContractPrice: 11000 },
    Standard: { channels: 236, price: 12100, noContractPrice: 16500 },
    All: { channels: 257, price: 15400, noContractPrice: 19800 },
    Pop230: { channels: 231, price: 17600, noContractPrice: 20900 },
    setTopBoxPrice: 5500
  },
  KT: {
    Lite: { channels: 200, price: 45100, noContractPrice: 50600 },
    Essence: { channels: 220, price: 48400, noContractPrice: 53900 },
    Kids: { channels: 250, price: 52800, noContractPrice: 58300 },
    setTopBoxPrice: 4400
  },
  LG: {
    Basic: { channels: 211, price: 38500, noContractPrice: 44000 },
    Premium: { channels: 252, price: 42900, noContractPrice: 48400 },
    PremiumDisney: { channels: 257, price: 51000, noContractPrice: 56500 },
    setTopBoxPrice: 5500
  }
};

function IPTVCalculator() {
  const [telco, setTelco] = useState('SK');
  const [plan, setPlan] = useState('Economy');
  const [tvCount, setTvCount] = useState(1);
  const [usedMonths, setUsedMonths] = useState(0);
  const [contractYears, setContractYears] = useState(3);

  const handleTelcoChange = (e) => {
    const v = e.target.value;
    setTelco(v);
    setPlan(Object.keys(telecomPlans[v]).find((k) => k !== 'setTopBoxPrice'));
  };

  const selectedPlan = telecomPlans[telco][plan];
  const setTopBoxPrice = telecomPlans[telco].setTopBoxPrice;
  const addCost = tvCount > 1 ? setTopBoxPrice * (tvCount - 1) : 0;
  const totalPrice = selectedPlan.price + addCost;

  const contractMonths = contractYears * 12;
  const discount = selectedPlan.noContractPrice - selectedPlan.price;
  const penalty = Math.round(discount * usedMonths * 1.2);

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>📺 IPTV 요금 & 위약금 계산기</h1>
      <div>
        <label>통신사: </label>
        <select value={telco} onChange={handleTelcoChange}>
          <option value="SK">SK Btv</option>
          <option value="KT">KT Genie</option>
          <option value="LG">LG U+</option>
        </select>
      </div>

      <div>
        <label>요금제: </label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          {Object.entries(telecomPlans[telco])
            .filter(([k]) => k !== 'setTopBoxPrice')
            .map(([k, d]) => (
              <option key={k} value={k}>
                {k} ({d.channels}채널 / {d.price.toLocaleString()}원)
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>TV 대수: </label>
        <select value={tvCount} onChange={(e) => setTvCount(Number(e.target.value))}>
          {[1, 2, 3].map((n) => (
            <option key={n} value={n}>{n}대</option>
          ))}
        </select>
      </div>

      <div>
        <label>사용 개월 수: </label>
        <input type="number" value={usedMonths} onChange={(e) => setUsedMonths(Number(e.target.value))} />
      </div>

      <div>
        <label>약정 기간: </label>
        <select value={contractYears} onChange={(e) => setContractYears(Number(e.target.value))}>
          {[1, 2, 3].map((n) => (
            <option key={n} value={n}>{n}년</option>
          ))}
        </select>
      </div>

      <hr />

      <div>
        <p>✅ 총 월 요금: <strong>{totalPrice.toLocaleString()}원</strong></p>
        <p>❗ 사용 {usedMonths}개월 후 예상 위약금: <strong>{penalty.toLocaleString()}원</strong></p>
      </div>
    </div>
  );
}

export default IPTVCalculator;