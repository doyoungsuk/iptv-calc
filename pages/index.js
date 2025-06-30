import { useState } from 'react';

const plans = {
  LG: {
    name: 'LG U+',
    internet: {
      '100M': 20000,
      '500M': 25000,
      '1G': 30000
    },
    tv: {
      '베이직': { price: 15000, channels: 213 },
      '고급형': { price: 16500, channels: 234 },
      '프리미엄': { price: 20900, channels: 255 },
      '프리미엄+디즈니': { price: 26950, channels: 260 }
    },
    setTopBox: 0,
    wifi: 0
  },
  KT: {
    name: 'KT',
    internet: {
      '100M': 22000,
      '500M': 22000,
      '1G': 27500
    },
    tv: {
      '베이직': { price: 14740, channels: 239 },
      '에센스': { price: 20240, channels: 269 }
    },
    setTopBox: 3300,
    wifi: 0
  },
  SK: {
    name: 'SK Btv',
    internet: {
      '100M': 22000,
      '500M': 22000,
      '1G': 27500
    },
    tv: {
      '베이직': { price: 12100, channels: 236 },
      '프라임': { price: 15400, channels: 257 }
    },
    setTopBox: 3300,
    wifi: 0
  }
};

export default function IPTVCalculator() {
  const [carrier, setCarrier] = useState('LG');
  const [internetSpeed, setInternetSpeed] = useState('100M');
  const [tvPlan, setTvPlan] = useState('베이직');
  const [tvCount, setTvCount] = useState(1);

  const selectedPlan = plans[carrier];
  const baseInternet = selectedPlan.internet[internetSpeed] || 0;
  const baseTV = selectedPlan.tv[tvPlan]?.price || 0;
  const extraSetTop = selectedPlan.setTopBox * (tvCount > 1 ? tvCount - 1 : 0);
  const wifiFee = selectedPlan.wifi;

  const total = baseInternet + baseTV + extraSetTop + wifiFee;
  const vatIncluded = Math.round(total * 1.1);

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>📺 통신사 요금 계산기 (대리점 기준)</h1>

      <label>
        통신사 선택:
        <select value={carrier} onChange={(e) => {
          setCarrier(e.target.value);
          const defaultTV = Object.keys(plans[e.target.value].tv)[0];
          setTvPlan(defaultTV);
        }}>
          {Object.keys(plans).map((key) => (
            <option key={key} value={key}>{plans[key].name}</option>
          ))}
        </select>
      </label>

      <br />
      <label>
        인터넷 속도:
        <select value={internetSpeed} onChange={(e) => setInternetSpeed(e.target.value)}>
          {Object.keys(plans[carrier].internet).map((speed) => (
            <option key={speed} value={speed}>{speed}</option>
          ))}
        </select>
      </label>

      <br />
      <label>
        TV 요금제:
        <select value={tvPlan} onChange={(e) => setTvPlan(e.target.value)}>
          {Object.keys(plans[carrier].tv).map((plan) => (
            <option key={plan} value={plan}>{plan} ({plans[carrier].tv[plan].channels}채널)</option>
          ))}
        </select>
      </label>

      <br />
      <label>
        TV 대수:
        <input
          type="number"
          value={tvCount}
          min={1}
          onChange={(e) => setTvCount(parseInt(e.target.value))}
        />
      </label>

      <hr />

      <h2>월 예상 요금: {total.toLocaleString()}원</h2>
      <p>(부가세 포함: {vatIncluded.toLocaleString()}원)</p>
      <p>(인터넷 + TV + 추가 셋톱박스 + 와이파이 임대료 포함)</p>
    </div>
  );
}
