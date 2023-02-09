import calendar
from odoo import models,api,fields
from datetime import timedelta, time, datetime
from odoo import http


class SalesDashboard(models.Model):
    _inherit = 'sale.order'
    
    
    
    @api.model 
    def get_year_details(self):
        dt = datetime.now() - timedelta(days=365)
        date_from = dt.date()
        
        domain_draft = [('date_order', '>=', date_from),('state', '=', 'draft')]
        domain_cancel = [('date_order', '>=', date_from),('state', '=', 'cancel')]
        domain_sale = [('date_order', '>=', date_from),('state', '=', 'sale')]
        domain_customer = [('date_order', '>=', date_from)]
        
        sale_quotaion = self.env['sale.order'].search(domain_draft)
        sale_cancel = self.env['sale.order'].search(domain_cancel)
        sale_ordered = self.env['sale.order'].search(domain_sale)
        # print("bdhcdjbckdsmbcdbvdabvjd-----------------------", sale_quotaion[1].create_date)
        sale_customer = []
        records = self.env['sale.order'].search(domain_customer)
        for rec in records:
            customer = rec.partner_id
            if customer not in sale_customer:
                sale_customer.append(customer)
        return  {
            "quotation_value" : len(sale_quotaion), 
            "cancelled_value" : len(sale_cancel),
            "ordered_value" : len(sale_ordered),
            "customer_value" : len(sale_customer),
        }
    
    
    @api.model 
    def get_month_details(self):
        dt = datetime.now() - timedelta(days=30)
        date_from = dt.date()
        
        domain_draft = [('date_order', '>=', date_from),('state', '=', 'draft')]
        domain_cancel = [('date_order', '>=', date_from),('state', '=', 'cancel')]
        domain_sale = [('date_order', '>=', date_from),('state', '=', 'sale')]
        domain_customer = [('date_order', '>=', date_from)]
        
        sale_quotaion = self.env['sale.order'].search(domain_draft)
        sale_cancel = self.env['sale.order'].search(domain_cancel)
        sale_ordered = self.env['sale.order'].search(domain_sale)
        
        sale_customer = []
        records = self.env['sale.order'].search(domain_customer)
        for rec in records:
            customer = rec.partner_id
            if customer not in sale_customer:
                sale_customer.append(customer)
        
        return  {
            "quotation_value" : len(sale_quotaion), 
            "cancelled_value" : len(sale_cancel),
            "ordered_value" : len(sale_ordered),
            "customer_value" : len(sale_customer),
        }
             
        
    @api.model 
    def get_week_details(self):
        dt = datetime.now() - timedelta(days=7)
        date_from = dt.date()
        
        domain_draft = [('date_order', '>=', date_from),('state', '=', 'draft')]
        domain_cancel = [('date_order', '>=', date_from),('state', '=', 'cancel')]
        domain_sale = [('date_order', '>=', date_from),('state', '=', 'sale')]
        domain_customer = [('date_order', '>=', date_from)]
        
        sale_quotaion = self.env['sale.order'].search(domain_draft)
        sale_cancel = self.env['sale.order'].search(domain_cancel)
        sale_ordered = self.env['sale.order'].search(domain_sale)
        
        sale_customer = []
        records = self.env['sale.order'].search(domain_customer)
        for rec in records:
            customer = rec.partner_id
            if customer not in sale_customer:
                sale_customer.append(customer)

        return  {
            "quotation_value" : len(sale_quotaion), 
            "cancelled_value" : len(sale_cancel),
            "ordered_value" : len(sale_ordered),
            "customer_value" : len(sale_customer),
        }
       
       
    @api.model 
    def get_day_details(self):
        dt = datetime.now() - timedelta(days=1)
        date_from = dt.date()
        
        domain_draft = [('date_order', '>=', date_from),('state', '=', 'draft')]
        domain_cancel = [('date_order', '>=', date_from),('state', '=', 'cancel')]
        domain_sale = [('date_order', '>=', date_from),('state', '=', 'sale')]
        domain_customer = [('date_order', '>=', date_from)]

        sale_quotaion = self.env['sale.order'].search(domain_draft)
        sale_cancel = self.env['sale.order'].search(domain_cancel)
        sale_ordered = self.env['sale.order'].search(domain_sale)
        
        sale_customer = []
        records = self.env['sale.order'].search(domain_customer)
        for rec in records:
            customer = rec.partner_id
            if customer not in sale_customer:
                sale_customer.append(customer)

        return  {
            "quotation_value" : len(sale_quotaion), 
            "cancelled_value" : len(sale_cancel),
            "ordered_value" : len(sale_ordered),
            "customer_value" : len(sale_customer),
            
        }
        
    
    @api.model 
    def get_quotation_status(self):
        state_count =[]
        state_value = []
        leads = self.env['sale.order.line'].search([])
        for rec in leads:
            status = rec.state
            if status not in state_value:
                state_value.append(status)
            state_count.append(status)
            
        state_val = []
        for index in range(len(state_value)):
            state_name = state_value[index]
            value = state_count.count(state_value[index])
            state_val.append({'label':state_name, 'value':value})        
        
        name = []
        for record in state_val:
            name.append(record.get('label'))
            
        count=[]
        for record in state_val:
            count.append(record.get('value'))
            
        status=[count, name]
        return  status
        
        
    @api.model
    def get_quotation_month_pie(self):
        month_count = []
        month_value = []
        leads = self.env['sale.order'].search([])
        for rec in leads:
            month = rec.create_date.month
            if month not in month_value:
                month_value.append(month)
            month_count.append(month)

        month_val = []
        for index in range(len(month_value)):
            value = month_count.count(month_value[index])
            month_name = calendar.month_name[month_value[index]]
            month_val.append({'label': month_name, 'value': value})

        name = []
        for record in month_val:
            name.append(record.get('label'))

        count = []
        for record in month_val:
            count.append(record.get('value'))

        month = [count, name]
        return month

        
    @api.model
    def get_month_qntty_bar(self):
        date_now = datetime.now()
        dtn = date_now.date()
        dt = datetime.now() - timedelta(days=30)
        date_from = str(dt.date())
        
        company_id = self.env.company.id
        
        query_product = ''' 
        select 
        product_template.name as product, 
        sum(sale_order_line.product_uom_qty) as product_quantity
        
        from 
        sale_order_line 
        inner join product_product on product_product.id = sale_order_line.product_id 
        inner join product_template on product_template.id = product_product.product_tmpl_id 
        INNER JOIN sale_order on sale_order.id = sale_order_line.order_id
        
        where 
        sale_order.create_date BETWEEN %s AND %s
        AND sale_order_line.company_id = '''+ str(company_id) + ''' 
        GROUP BY sale_order_line.product_id, product 
        ORDER BY product_quantity DESC LIMIT 40;'''
        
        self._cr.execute(query_product,(date_from, dtn))
        docs= self._cr.dictfetchall()
        quantity = []
        for record in docs:
            quantity.append(record.get('product_quantity'))
        product=[]
        for record in docs:
            product.append(record.get('product'))
        final= [quantity, product]
        return final

    
    @api.model
    def get_amount_bar(self):
        date_now = datetime.now()
        dtn = date_now.date()
        dt = datetime.now() - timedelta(days=30)
        date_from = dt.date()
            
        company_id = self.env.company.id
        
        query_product = ''' 
        select 
        product_template.name as product, 
        sum(sale_order_line.price_total) as price_subtotal
        
        from sale_order_line 
        inner join product_product on product_product.id = sale_order_line.product_id 
        inner join product_template on product_template.id = product_product.product_tmpl_id 
        INNER JOIN sale_order on sale_order.id = sale_order_line.order_id
        
        where 
        sale_order.create_date BETWEEN %s AND %s
        AND sale_order_line.company_id = '''+ str(company_id) + ''' 
        GROUP BY sale_order_line.product_id, product 
        ORDER BY price_subtotal DESC LIMIT 20;'''
        
        self._cr.execute(query_product,(date_from, dtn))
        docs= self._cr.dictfetchall()
        quantity = []
        for record in docs:
            quantity.append(record.get('price_subtotal'))
        product=[]
        for record in docs:
            product.append(record.get('product'))
        final= [quantity, product]

        return final
    
    
    @api.model
    def get_order_status(self):
        state_count =[]
        state_value = []
        leads = self.env['sale.order'].search([])
        for rec in leads:
            status = rec.order_status.name
            if status not in state_value:
                state_value.append(status)
            state_count.append(status)
            
        state_val = []
        for index in range(len(state_value)):
            state_name = state_value[index]
            value = state_count.count(state_value[index])
            state_val.append({'label':state_name, 'value':value})        
        
        name = []
        for record in state_val:
            name.append(record.get('label'))
            
        count=[]
        for record in state_val:
            count.append(record.get('value'))
            
        status=[count, name]
        return  status
    
    
    
    
    @api.model
    def get_invoice_status(self):
        state_count =[]
        state_value = []
        leads = self.env['sale.order'].search([])
        for rec in leads:
            status = rec.invoice_status
            if status not in state_value:
                state_value.append(status)
            state_count.append(status)
            
        state_val = []
        status_name = []
        for index in range(len(state_value)):
            if state_value[index] == "upselling":
                status_name.append("Upselling Opportunity")
                
            if state_value[index] == "invoiced":
                status_name.append("Fully Invoiced")
                
            if state_value[index] == "to invoice":
                status_name.append("To Invoice")
                
            if state_value[index] == "no":
                status_name.append("Nothing to Invoice")
                
            state_name = status_name[index]
            value = state_count.count(state_value[index])
            state_val.append({'label':state_name, 'value':value})        
        
        name = []
        for record in state_val:
            name.append(record.get('label'))
            
        count=[]
        for record in state_val:
            count.append(record.get('value'))
            
        status=[count, name]
        return  status


    @api.model
    def get_top_deals(self):
        """Top 10 Deals Table"""
        self._cr.execute('''SELECT 
                         sale_order.partner_id,
                         sale_order.id,
                         sale_order.amount_total,
                         sale_order.name,
                         sale_order.company_id
        from sale_order 
        where 
        sale_order.amount_total is not null AND sale_order.state = 'sale'
        GROUP BY sale_order.partner_id,
                 sale_order.id,
                 sale_order.amount_total,
                 sale_order.name,
                 sale_order.company_id
        order by sale_order.amount_total DESC limit 10''')
        data1 = self._cr.fetchall()

        deals = []
        num = 0
        for rec in data1:
            company_id = rec[4]
            partner_id = rec[0]
            company_id_obj = self.env['res.company'].browse(company_id)
            partner_id_obj = self.env['res.partner'].browse(partner_id)
            currency = company_id_obj.currency_id.symbol
            rec_list = list(rec)
            rec_list[0] = partner_id_obj.name
            num += 1
            rec_list.append(currency)
            rec_list.append(num)
            deals.append(rec_list)

        return {'deals': deals}
