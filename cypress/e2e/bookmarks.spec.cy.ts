import { Job } from '../../app/bookmarks/page';

const mockJob: Job = {
  id: '1',
  title: 'Software Engineer',
  orgName: 'Tech Corp',
  location: ['New York', 'Remote'],
  description: 'Develop awesome apps',
  logoUrl: '/logo.png',
  opType: 'Full-time',
  datePosted: '2025-08-01',
};

describe('Bookmark Functionality', () => {
 // cypress/e2e/bookmarks.cy.ts (in beforeEach for Authenticated User and Edge Cases)
beforeEach(() => {
  cy.intercept('POST', '/api/auth/callback/credentials', {
    statusCode: 200,
    body: { accessToken: 'mock-token', user: { id: '123', email: 'test@example.com' } },
  }).as('login');
  cy.intercept('GET', '/api/auth/session', {
    statusCode: 200,
    body: { accessToken: 'mock-token', user: { id: '123', email: 'test@example.com' } },
  }).as('session');
  cy.login('test@example.com', 'password123');
  cy.url().should('eq', 'http://localhost:3000/');
  cy.wait('@getJobs');
});

  describe('Authenticated User', () => {
    beforeEach(() => {
      // Mock successful login
      cy.intercept('POST', '/api/auth/signin', {
        statusCode: 200,
        body: { accessToken: 'mock-token', user: { id: '123' } },
      }).as('login');

      // Log in before each test
      cy.login('test@example.com', 'password123');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.wait('@getJobs');
    });

    it('bookmarks a job and verifies it appears on the bookmarks page', () => {
      // Click bookmark button
      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.wait('@addBookmark');
      cy.get('[data-testid="bookmark-check-icon"]').should('exist');
      cy.get('[data-testid="bookmark-check-icon"]').should('have.class', 'text-blue-500');

      // Navigate to bookmarks page
      cy.get('[data-testid="bookmarks-link"]').click();
      cy.url().should('eq', 'http://localhost:3000/bookmarks');
      cy.wait('@getBookmarks');

      // Mock bookmarks response with the bookmarked job
      cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
        statusCode: 200,
        body: { data: [{ eventID: '1' }] },
      }).as('getBookmarksWithJob');
      cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
        statusCode: 200,
        body: { data: [mockJob] },
      }).as('getJobsWithBookmark');
      cy.reload();
      cy.wait(['@getBookmarksWithJob', '@getJobsWithBookmark']);

      // Verify job appears
      cy.get('[data-testid="job-card"]').should('contain', 'Software Engineer');
      cy.get('[data-testid="job-card"]').should('contain', 'Tech Corp');
    });

    it('unbookmarks a job and verifies it is removed from the bookmarks page', () => {
      // Mock initial bookmarks
      cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
        statusCode: 200,
        body: { data: [{ eventID: '1' }] },
      }).as('getBookmarksWithJob');
      cy.visit('/');
      cy.wait('@getJobs');

      // Unbookmark job
      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.wait('@removeBookmark');
      cy.get('[data-testid="bookmark-icon"]').should('exist');
      cy.get('[data-testid="bookmark-icon"]').should('have.class', 'text-gray-400');

      // Navigate to bookmarks page
      cy.get('[data-testid="bookmarks-link"]').click();
      cy.url().should('eq', 'http://localhost:3000/bookmarks');
      cy.wait('@getBookmarks');

      // Verify no jobs
      cy.get('[data-testid="no-bookmarks-message"]').should('contain', 'No bookmarked jobs found.');
    });

    it('shows no bookmarked jobs message when no jobs are bookmarked', () => {
      cy.get('[data-testid="bookmarks-link"]').click();
      cy.url().should('eq', 'http://localhost:3000/bookmarks');
      cy.wait('@getBookmarks');
      cy.get('[data-testid="no-bookmarks-message"]').should('contain', 'No bookmarked jobs found.');
    });

    it('handles API error when bookmarking fails', () => {
      cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/*', {
        statusCode: 500,
        body: { error: 'Failed to add bookmark' },
      }).as('addBookmarkError');

      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.wait('@addBookmarkError');
      cy.get('.Toastify__toast--error').should('contain', 'Failed to update bookmark. Please try again.');
    });
  });

  describe('Unauthenticated User', () => {
    beforeEach(() => {
      // Mock unauthenticated session
      cy.intercept('GET', '/api/auth/session', {
        statusCode: 200,
        body: {},
      }).as('session');
      cy.visit('/');
      cy.wait('@getJobs');
    });

    it('prompts sign-in when attempting to bookmark', () => {
      cy.get('[data-testid="bookmark-button"]').first().click();
      cy.get('.Toastify__toast--error').should('contain', 'Please sign in!');
      cy.get('[data-testid="bookmark-icon"]').should('exist');
      cy.get('[data-testid="bookmark-check-icon"]').should('not.exist');
    });

    it('redirects to login when accessing bookmarks page', () => {
      cy.visit('/bookmarks');
      cy.url().should('eq', 'http://localhost:3000/login');
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      // Mock successful login
      cy.intercept('POST', '/api/auth/signin', {
        statusCode: 200,
        body: { accessToken: 'mock-token', user: { id: '123' } },
      }).as('login');
      cy.login('test@example.com', 'password123');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.wait('@getJobs');
    });

    it('handles empty job list', () => {
      cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
        statusCode: 200,
        body: { data: [] },
      }).as('getEmptyJobs');
      cy.reload();
      cy.wait('@getEmptyJobs');
      cy.get('[data-testid="no-jobs-message"]').should('contain', 'No jobs found. Try adjusting your search!');
    });
  });
});
