const https = require('https');

const API_KEY = process.env.DATA_API_KEY || '6d9f95965c1a74dc5953a387e622daae';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  // Sanitização: só letras, números, pontos e underscores (padrão Instagram)
  const clean = username.trim().replace(/^@+/, '');
  if (!/^[a-zA-Z0-9._]{1,30}$/.test(clean)) {
    return res.status(400).json({ error: 'Username inválido' });
  }

  try {
    const url = `https://www.data-api.click/api-instagram/api.php?username=${encodeURIComponent(clean)}&key=${API_KEY}`;

    const raw = await new Promise((resolve, reject) => {
      const request = https.get(url, { timeout: 10000 }, (response) => {
        if (response.statusCode !== 200) {
          return reject(new Error(`API retornou status ${response.statusCode}`));
        }

        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString()));
          } catch {
            reject(new Error('Resposta inválida da API'));
          }
        });
        response.on('error', reject);
      });

      request.on('error', reject);
      request.on('timeout', () => {
        request.destroy();
        reject(new Error('Timeout'));
      });
    });

    const p = raw.perfil_buscado;
    if (!p) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    const profile = {
      name: p.full_name || p.username || '',
      bio: p.biography || '',
      avatar: p.profile_pic_url || '',
      avatar_hd: p.profile_pic_url || '',
      followers: p.followers_count || 0,
      following: p.following_count || 0,
      posts: p.posts_count || 0,
      is_verified: p.is_verified || false,
      is_private: p.is_private || false,
      external_link: p.external_url || null,
    };

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({ profile });
  } catch (error) {
    res.status(502).json({ error: error.message });
  }
};
