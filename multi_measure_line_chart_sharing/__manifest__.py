# -*- coding: utf-8 -*-
{
    'name': "Multi Measure Line Chart",

    'summary': """Custom Sale Multi Measure Line Chart""",

    'description': """Custom Sale Multi Measure Line Chart for ASB Sharing Session""",

    'author': "Gaung Jagad",
    'category': 'Uncategorized',
    'version': '0.1',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/assets_load.xml',
        'views/sharing_session_views.xml',
    ],
    'auto_install': False,
    'installable': True,
    'application': True,
}
