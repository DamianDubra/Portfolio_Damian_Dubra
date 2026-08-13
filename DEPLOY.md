# Deploy — Portfolio Damian Dubra (Ubuntu + Nginx + Gunicorn)

Servidor: `54.210.206.193` · usuario `ubuntu`
Ruta del repo: `/home/ubuntu/aplicaciones/Portfolio_Damian_Dubra`
Ruta del proyecto Django (donde esta `manage.py`): `/home/ubuntu/aplicaciones/Portfolio_Damian_Dubra/mi_portfolio`

## 1. Preparar el servidor

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip python3-venv nginx -y

cd /home/ubuntu
python3 -m venv django_env
source django_env/bin/activate
```

## 2. Clonar el repo e instalar dependencias

```bash
mkdir -p /home/ubuntu/aplicaciones
cd /home/ubuntu/aplicaciones
git clone https://github.com/DamianDubra/Portfolio_Damian_Dubra

cd Portfolio_Damian_Dubra/mi_portfolio
pip install -r requirements.txt
```

(`requirements.txt` ya incluye gunicorn y whitenoise.)

## 3. Migraciones, superusuario y estaticos

```bash
cd /home/ubuntu/aplicaciones/Portfolio_Damian_Dubra/mi_portfolio
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py collectstatic --noinput
```

`collectstatic` es necesario porque en produccion (`DEBUG = False`) los estaticos
se sirven desde `.../mi_portfolio/static/`, que es lo que apunta nginx.

## 4. Probar Gunicorn a mano

```bash
gunicorn --config conf/gunicorn_config.py mi_portfolio.wsgi:application
```

Abrir `http://54.210.206.193:8000`. Cortar con Ctrl+C.

**Puerto 8000**: abrirlo en el Security Group de AWS (inbound TCP 8000) solo si
queres probar directo contra gunicorn. Para el sitio final alcanza con el 80
(y 443 si despues pones HTTPS).

## 5. Nginx

```bash
sudo cp /home/ubuntu/aplicaciones/Portfolio_Damian_Dubra/mi_portfolio/conf/nginx_portfolio \
        /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Servicio systemd de Gunicorn

```bash
sudo cp /home/ubuntu/aplicaciones/Portfolio_Damian_Dubra/mi_portfolio/conf/portfolio.service \
        /etc/systemd/system/portfolio.service
sudo systemctl daemon-reload
sudo systemctl enable portfolio
sudo systemctl start portfolio
sudo systemctl status portfolio
```

## 7. Permisos para www-data

```bash
sudo chown -R ubuntu:www-data /home/ubuntu
sudo chmod o+x /home/ubuntu /home/ubuntu/aplicaciones
```

## 8. Pasar a produccion

En `mi_portfolio/mi_portfolio/settings.py`:

- `DEBUG = False`
- Cambiar `SECRET_KEY` por una nueva (la actual es la de desarrollo y esta en git).

Despues:

```bash
python3 manage.py collectstatic --noinput
sudo systemctl restart portfolio
sudo systemctl restart nginx
```

## Dominio: damiandubra.com.ar

El dominio ya esta configurado en `settings.py` (`ALLOWED_HOSTS` y
`CSRF_TRUSTED_ORIGINS`) y en `conf/nginx_portfolio` (`server_name`).

Falta el DNS, en el panel de tu registrador (NIC Argentina o donde lo tengas):

| Tipo | Nombre | Valor            |
|------|--------|------------------|
| A    | `@`    | `54.210.206.193` |
| A    | `www`  | `54.210.206.193` |

La propagacion tarda entre minutos y unas horas. Verificar con:

```bash
dig +short damiandubra.com.ar
```

Tiene que devolver `54.210.206.193`. Recien cuando eso responda bien, sacar el
certificado HTTPS:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d damiandubra.com.ar -d www.damiandubra.com.ar
```

Certbot edita el archivo de nginx solo (agrega el bloque 443 y el redirect de
80 a 443) y deja la renovacion automatica programada.

Abrir el puerto 443 en el Security Group de AWS ademas del 80.
