export default async function handler(req, res) {
  const { id = 'unknown', to = '' } = req.query;

  // GASにクリックを記録（バックグラウンドで実行）
  const GAS_URL = process.env.GAS_URL;
  if (GAS_URL) {
    fetch(`${GAS_URL}?id=${encodeURIComponent(id)}&to=${encodeURIComponent(to)}`)
      .catch(() => {});
  }

  // リダイレクト先がなければエラー
  if (!to) {
    return res.status(400).send('URLパラメーターが必要です（?id=xxx&to=https://...）');
  }

  // 302リダイレクト
  res.redirect(302, to);
}
