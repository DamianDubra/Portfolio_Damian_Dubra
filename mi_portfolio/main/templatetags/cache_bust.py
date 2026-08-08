import os
from django import template
from django.conf import settings

register = template.Library()

@register.simple_tag
def static_versioned(path):
    full_path = os.path.join(settings.STATICFILES_DIRS[0], path)
    try:
        timestamp = int(os.path.getmtime(full_path))
    except OSError:
        timestamp = 0
    return f"{settings.STATIC_URL}{path}?v={timestamp}"