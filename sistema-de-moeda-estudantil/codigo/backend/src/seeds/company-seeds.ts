import Company from '../models/company';

async function createDefaultCompanies(): Promise<void> {
	const companyCount: number = await Company.count();

	if (companyCount === 0) {
		await Company.create({
			name: 'Microsoft',
			email: 'microsoft@email.com',
			password: 'senhamicrosoft',
            cnpj: '14141414141414'
		});

		await Company.create({
			name: 'Github',
			email: 'github@email.com',
			password: 'senhagithub',
            cnpj: '41414141414141'
		});

		console.log("Default companies created successfully");
    } else console.log("Default companies already exist");
}

export default createDefaultCompanies;