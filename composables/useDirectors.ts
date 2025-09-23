export interface Service {
    name: string;
    image: string;
    description: string;
    category: string;
}

export interface Director {
    id: number;
    name: string;
    position: string;
    image: string;
    description: string;
    qualifications: string[];
    services: Service[];
    email: string;
    phone: string;
}

export interface DirectorContact {
    id: number;
    name: string;
    image: string;
}

export interface DirectorsData {
    [key: number]: Director;
}

export interface ServiceMap {
    [serviceName: string]: number;
}

export const useDirectors = () => {
    const directorsData: DirectorsData = {
        1: {
            id: 1,
            name: 'D M Kobbekaduwe',
            position: 'Director',
            image: '/images/team/Dammika.jpg',
            description: 'With over 25 years of experience in strategic planning and organizational development, D M Kobbekaduwe has been instrumental in driving PPA\'s growth and success. His expertise spans across multiple sectors including finance, technology, and business development.',
            qualifications: [
                'MBA in Strategic Management',
                'Bachelor of Business Administration',
                'Certified Project Management Professional (PMP)',
                'Advanced Certificate in Corporate Governance'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'dkobbekaduwe@ppa.lk',
            phone: '+94 11 234 5678'
        },
        2: {
            id: 2,
            name: 'Rehan Jayatilake',
            position: 'Director',
            image: '/images/team/Rehan.jpg',
            description: 'Rehan Jayatilake brings extensive experience in operations management and process optimization. His leadership has been crucial in streamlining PPA\'s operational efficiency and service delivery excellence.',
            qualifications: [
                'Master of Science in Operations Management',
                'Bachelor of Engineering',
                'Six Sigma Black Belt Certification',
                'Lean Management Certification'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'rehan@ppa.lk',
            phone: '+94 11 234 5679'
        },
        3: {
            id: 3,
            name: 'Ravindra Hewavitharana',
            position: 'Director',
            image: '/images/team/Ravindra.jpg',
            description: 'Ravindra Hewavitharana is a technology visionary with deep expertise in digital transformation and innovation. He leads PPA\'s technological initiatives and digital strategy implementation.',
            qualifications: [
                'Master of Computer Science',
                'Bachelor of Information Technology',
                'Certified Information Systems Security Professional (CISSP)',
                'AWS Solutions Architect Certification'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'ravindra@ppa.lk',
            phone: '+94 11 234 5680'
        },
        4: {
            id: 4,
            name: 'S M P Jayantha',
            position: 'Director',
            image: '/images/team/Jayantha.jpg',
            description: 'S M P Jayantha is a seasoned finance professional with comprehensive experience in financial management, investment strategies, and regulatory compliance.',
            qualifications: [
                'Chartered Financial Analyst (CFA)',
                'Master of Finance',
                'Certified Public Accountant (CPA)',
                'Advanced Diploma in Taxation'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'jayantha@ppa.lk',
            phone: '+94 11 234 5681'
        },
        5: {
            id: 5,
            name: 'Dr W G Somaratne',
            position: 'Director',
            image: '/images/team/Somarathne.jpg',
            description: 'Dr W G Somaratne is a distinguished researcher and academic with extensive experience in innovation management and strategic research initiatives.',
            qualifications: [
                'PhD in Business Administration',
                'Master of Science in Management',
                'Postgraduate Diploma in Research Methodology',
                'Certified Innovation Manager'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'somaratne@ppa.lk',
            phone: '+94 11 234 5682'
        },
        6: {
            id: 6,
            name: 'Mr Upananda Karunarathne',
            position: 'Director',
            image: '/images/team/Upananda.jpg',
            description: 'Upananda Karunarathne is an HR expert specializing in organizational development, talent management, and employee engagement strategies.',
            qualifications: [
                'Master of Human Resource Management',
                'Bachelor of Psychology',
                'Certified HR Professional (CHRP)',
                'Advanced Certificate in Organizational Development'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'upananda@ppa.lk',
            phone: '+94 11 234 5683'
        },
        7: {
            id: 7,
            name: 'Attorney Wijitha Manamperi',
            position: 'Director',
            image: '/images/team/Vijitha.jpg',
            description: 'Attorney Wijitha Manamperi is a distinguished legal professional with expertise in corporate law, compliance, and regulatory affairs.',
            qualifications: [
                'Attorney-at-Law',
                'Master of Laws (LLM)',
                'Bachelor of Laws (LLB)',
                'Certified Compliance Professional'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'wijitha@ppa.lk',
            phone: '+94 11 234 5684'
        },
        8: {
            id: 8,
            name: 'Nalin Amunugama',
            position: 'Director',
            image: '/images/team/Nalin.jpg',
            description: 'Nalin Amunugama is a marketing strategist with extensive experience in brand management, digital marketing, and customer relationship management.',
            qualifications: [
                'Master of Marketing',
                'Bachelor of Business Administration',
                'Certified Digital Marketing Professional',
                'Advanced Certificate in Brand Management'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'nalin@ppa.lk',
            phone: '+94 11 234 5685'
        },
        9: {
            id: 9,
            name: 'Januka Karunasena',
            position: 'Director',
            image: '/images/team/Januka.jpg',
            description: 'Januka Karunasena specializes in business development, strategic partnerships, and market expansion initiatives.',
            qualifications: [
                'Master of Business Development',
                'Bachelor of Commerce',
                'Certified Sales Professional',
                'Advanced Diploma in Strategic Management'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'januka@ppa.lk',
            phone: '+94 11 234 5686'
        },
        10: {
            id: 10,
            name: 'Prof Sarath P Nissanka',
            position: 'Director',
            image: '/images/team/Nissanka 2.jpg',
            description: 'Prof Sarath P Nissanka is an esteemed academic and researcher with extensive experience in educational leadership and curriculum development.',
            qualifications: [
                'PhD in Education',
                'Master of Education',
                'Postgraduate Diploma in Higher Education',
                'Certified Academic Leader'
            ],
            services: [
                {
                    name: 'Initial Discussion & Scoping',
                    image: '/images/services/Initial Discussion & Scoping.png',
                    description: 'Comprehensive consultation and project scoping for your plantation needs',
                    category: 'Land'
                },
                {
                    name: 'Land Identification (9 Provinces)',
                    image: '/images/services/Land Identification.png',
                    description: 'Expert land identification services across all 9 provinces of Sri Lanka',
                    category: 'Land'
                },
                {
                    name: 'Title Reports & Deed Transfers',
                    image: '/images/services/service.png',
                    description: 'Professional legal documentation and property transfer services',
                    category: 'Land'
                },
            ],
            email: 'nissanka@ppa.lk',
            phone: '+94 11 234 5687'
        }
    }

    // Service mapping for navigation
    const serviceMap: ServiceMap = {
        'Initial Discussion & Scoping': 1,
        'Land Identification (9 Provinces)': 2,
        'Title Reports & Deed Transfers': 3,
        'Legal & Succession Advisory': 4,
        'Estate/Company Registration': 5,
        'Project Reports (DPRs)': 6,
        'Budgeting & Cost Estimates': 7,
        'Accounts & Tax Advisory': 8,
        'Statutory Reporting & Compliance': 9,
        'Investment Appraisal (NPV, IRR, ROI)': 10,
        'Land, Topography & Soil Surveys': 11,
        'Farm Layout & Planting Design': 12,
        'Agronomy Consultancy (Planting → Harvest)': 13,
        'Irrigation / Fertigation & Crop Protection': 14,
        'Nurseries': 15,
        'Mechanization & Estate Engineering': 16,
        'Post-Harvest Handling': 17,
        'Crop Processing (Tea, Rubber, Coconut, Spices)': 18,
        'Product Development & Value-Added Lines': 19,
        'Branding & Packaging Services': 20,
        'Export Market Entry & Premium Positioning': 21,
        'HRM Systems (Recruitment, Payroll, IR)': 22,
        'Worker Training & Upskilling': 23,
        'Labour Law & EPF/ETF Compliance': 24,
        'Plantation Digital Identity': 25,
        'Farm Management Dashboards': 26,
        'Traceability / Blockchain / R & D': 27,
        'Transport & Cold Chain Logistics': 28,
        'Export/Import Facilitation & Customs': 29,
        'E-commerce & B2B Platforms': 30,
        'Packaging Design & Storytelling': 31,
        'Digital Marketing Campaigns': 32,
        'Trade Fairs & Global Exhibitions': 33,
        'Environmental: Soil & Water Health': 34,
        'Social: Worker Welfare Audits': 35,
        'Governance: ESG Audits & Certifications': 36,
        'Rainforest Alliance': 37,
        'Organic (EU/USDA/JAS/SL)': 38,
        'Fairtrade International': 39,
        'GlobalG.A.P. & UTZ': 40,
        'SMETA & SA8000': 41,
        'ISO Standards': 42,
        'B Corp Certification': 43,
        'GRI / SASB Reporting': 44,
        'Yield per Hectare (kg/ha/year)': 45,
        'ROI per Acre (Annualized)': 46,
        'Value-Added % (Raw vs. Branded)': 47,
        'Export Readiness Index': 48,
        'Worker Welfare Score': 49,
        'ESG Audit Score': 50,
        'Carbon Credit Revenues': 51
    }

    // Get all directors as an array
    const getAllDirectors = (): Director[] => {
        return Object.values(directorsData)
    }

    // Get director by ID
    const getDirectorById = (id: number | string): Director | null => {
        return directorsData[parseInt(id.toString())] || null
    }

    // Get directors for contact cards
    const getDirectorContacts = (): DirectorContact[] => {
        return Object.values(directorsData).map(director => ({
            id: director.id,
            name: director.name,
            image: director.image
        }))
    }

    // Get service ID by service name
    const getServiceId = (serviceName: string): number => {
        return serviceMap[serviceName] || 1
    }

    // Get director services
    const getDirectorServices = (directorId: number | string): Service[] => {
        const director = getDirectorById(directorId)
        return director ? director.services : []
    }

    return {
        directorsData,
        serviceMap,
        getAllDirectors,
        getDirectorById,
        getDirectorContacts,
        getServiceId,
        getDirectorServices
    }
}