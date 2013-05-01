package linkki.taskswitching.service;

import java.util.List;
import linkki.taskswitching.dto.Organization;
import linkki.taskswitching.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Transactional
    public void createOrUpdateOrDelete(List<Organization> organizations) {
        List<Organization> organizationsToRemove = organizationRepository.findAll();

        for (Organization organization : organizations) {
            if (organization.getId() == null) {
                organizationRepository.save(organization);
                continue;
            }

            Organization entry = organizationRepository.findOne(organization.getId());
            if (entry == null) {
                throw new IllegalArgumentException("Data not synchronized.");
            }

            // entry available in the data received from frontend, it should
            // not be removed
            organizationsToRemove.remove(entry);
            entry.setName(organization.getName());
        }

        // remove ones that were not in the data from frontend
        organizationRepository.delete(organizationsToRemove);
    }

    @Transactional
    public Organization create(Organization organization) {
        return organizationRepository.save(organization);
    }

    @Transactional
    public void delete(Long organizationId) {
        Organization o = organizationRepository.findOne(organizationId);
        if (o != null) {
            organizationRepository.delete(o);
        }
    }

    @Transactional(readOnly = true)
    public List<Organization> list() {
        return organizationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Organization read(Long organizationId) {
        return organizationRepository.findOne(organizationId);
    }
}
