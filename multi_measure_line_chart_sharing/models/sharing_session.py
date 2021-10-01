# -*- coding: utf-8 -*-

from odoo import models, fields, api

class SharingMonitoring(models.Model):
    _name = 'sharing.monitoring'
    _description = 'Sharing Monitoring'
    
    name = fields.Char(string='Name')
    detail_line = fields.One2many('sharing.detail', 'monitoring_id', string='Detail')

    def get_sistole_diastole_data(self):
        detail_ids = self.detail_line.sorted('date')
        title = 'Line Chart'

        sistole, diastole, date_labels = [], [], []

        for detail in detail_ids:
            sistole.append(detail.sistole)
            diastole.append(detail.diastole)
            date_labels.append(detail.date)

        result = {
            'labels': date_labels,
            'sistole': sistole,
            'diastole': diastole,
            'title': title,
        }
        return result











    def action_view_monitoring_chart(self):
        action = self.env["ir.actions.actions"]._for_xml_id("multi_measure_line_chart_sharing."\
                                                            "sharing_monitoring_qweb_action")
        action['context'] = {
            'active_id': self.id,
        }
        return action

class SharingTimesheet(models.Model):
    _name = 'sharing.detail'
    _description = 'Sharing Timesheet'
    
    name = fields.Char(string='Name')
    sistole = fields.Float(string='Sistole')
    diastole = fields.Float(string='Diastole')
    date = fields.Datetime(string='Datetime')
    monitoring_id = fields.Many2one('sharing.monitoring', string='Monitoring')
