import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany?: number;

  constructor(private authService: AuthService, private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: any) => { 
      if (user && user.companies) {
        this.companies = user.companies;
      } else {
        this.fetchCompanies();
      }
    });
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (companies) => this.companies = companies,
      error: (error) => console.error('Error fetching companies:', error)
    });
  }

  onSelectCompany(): void {
    if (this.selectedCompany) {
      this.authService.setSelectedCompanyId(this.selectedCompany);
      this.router.navigate(['/company-home', this.selectedCompany]);
    }
  }
}
