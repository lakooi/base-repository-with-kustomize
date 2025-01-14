// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

const mockAttainmentsClient = [
  { id: 1,
    name: 'Exercises',
    category: 'Other',
    date: new Date(2023, 9, 1),
    expiryDate: new Date(2024, 8, 14), 
    formulaId: 1,  // formulaId is specified for attainments that have sub-attinments
    subAttainments: [ 
      { id: 11, 
        name: '4 mandatory exercises',
        category: 'Other',
        date: new Date(2023, 9, 1), 
        expiryDate: new Date(2024, 8, 14), 
        formulaId: 1,
        affectCalculation: true,
        formulaAttributes: {
          maxPoints: '',
          minRequiredPoints: '',
          weight: ''
        },
        subAttainments: [
          { id: 111, 
            name: 'Exercise 1',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          }, 
          { id: 112, 
            name: 'Exercise 2',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          }, 
          { id: 113, 
            name: 'Exercise 3',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14), 
            formulaId: 1,
            affectCalculation: true,
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [
              { id: 1131, 
                name: 'Exercise 3.1',
                category: 'Other',
                date: new Date(2023, 9, 1), 
                expiryDate: new Date(2024, 8, 14),
                affectCalculation: true,
                formulaAttributes: {
                  maxPoints: '',
                  minRequiredPoints: '',
                  weight: ''
                },
                subAttainments: [],
              }, 
              { id: 1132,
                name: 'Exercise 3.2',
                category: 'Other',
                date: new Date(2023, 9, 1), 
                expiryDate: new Date(2024, 8, 14), 
                affectCalculation: true,
                formulaAttributes: {
                  maxPoints: '',
                  minRequiredPoints: '',
                  weight: ''
                },
                subAttainments: [],
              }
            ] 
          }, 
          { id: 114, 
            name: 'Exercise 4',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          }
        ] 
      },
      { id: 12, 
        name: '3 optional exercises', 
        category: 'Other',
        date: new Date(2023, 9, 1), 
        expiryDate: new Date(2024, 8, 14), 
        formulaId: 1,
        affectCalculation: false,  // optional exercises don't affect the grade of Exercises
        fformulaAttributes: {
          maxPoints: '',
          minRequiredPoints: '',
          weight: ''
        },
        subAttainments: [
          { id: 121, 
            name: 'Exercise 5',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,  // The grade for optional exercises is still calculated 
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          }, 
          { id: 122, 
            name: 'Exercise 6',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,  // The grade for optional exercises is still calculated 
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          }, 
          { id: 123, 
            name: 'Exercise 7',
            category: 'Other',
            date: new Date(2023, 9, 1), 
            expiryDate: new Date(2024, 8, 14),
            affectCalculation: true,  // The grade for optional exercses is still calculated 
            formulaAttributes: {
              maxPoints: '',
              minRequiredPoints: '',
              weight: ''
            },
            subAttainments: [],
          },
        ] 
      }
    ]
  },
  { id: 2,
    name: 'Project',
    category: 'Project',
    date: new Date(2023, 9, 1), 
    expiryDate: new Date(2024, 8, 14),
    subAttainments: [],
  },
  { id: 3,
    name: 'Exam',
    category: 'Exam',
    date: new Date(2023, 9, 1), 
    expiryDate: new Date(2024, 8, 14),
    subAttainments: [],
  }
];

export default mockAttainmentsClient;