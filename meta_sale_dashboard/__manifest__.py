{
    'name': "Sale Dashboard",
    'description': """Sale Dashboard, Detailed Dashboard View for Sale, Sale, Dashboard, odoo14""",
    'summary': """Detailed Dashboard View for Sale""",
    'category': 'Sales',
    'version': '14.0.0',
    'author': 'Metamorphosis',
    'company': 'Metamorphosis',
    'maintainer': 'Metamorphosis',
    'website': "https://www.metamorphosis.com.bd",
    'sequence': 0,
    'depends': ['base', 'sale_management', 'sale', 'board'],
    'data': [
        'views/dashboard_menu.xml',
        'views/assets.xml',
    ],
    
    'qweb': [
        'static/src/xml/view_dashboard.xml',
    ],
    
    'images': [
        
    ],
    'license': 'LGPL-3',
    'installable': True,
    'application': True,
    'auto_install': False,
}
