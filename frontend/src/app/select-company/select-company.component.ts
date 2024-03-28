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

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.companyService.getCompaniesForUser(userId).subscribe({
        next: (companies) => this.companies = companies,
        error: (error) => console.error('Error fetching companies for user:', error)
      });
    } else {
      console.error('User ID is missing');
    }
  }

  onSelectCompany(companyId?: number): void {
    console.log(`Selected Company ID: ${companyId}`); 
    if (companyId) {
      this.authService.setSelectedCompanyId(companyId);
      this.router.navigate(['/home', companyId]); 
    }
  }
}
