import { Component } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent {
  companies: string[] = [];
  selectedCompany: string = ''; 


  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }
}
