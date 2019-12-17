class Element < ApplicationRecord
  belongs_to :site
  has_many :ropes, class_name: "Element::Rope"
  has_many :preuse_inspections
  has_many :periodic_inspections
  accepts_nested_attributes_for :ropes

  validates_presence_of :name
  validates_presence_of :site

  after_initialize :set_default_instructions

  def set_default_instructions
    self.setup_equipment_instructions ||= "All gear checked<br>Bad gear set aside"
    self.setup_element_instructions ||= "Everything appears normal<br>Backup halos not engaged"
    self.setup_environment_instructions ||= "Weather is appropriate for climbing<br>No widowmakers"
    self.takedown_equipment_instructions ||= "Gear stored properly<br>Helmets sprayed"
    self.takedown_element_instructions ||= "Access methods removed"
    self.takedown_environment_instructions ||= "Area clear of garbage"
    self.periodic_equipment_instructions ||= "All gear checked for rust and wear<br>No gear is over their age limit<br>Rescue bag checked and reflaked"
    self.periodic_element_instructions ||= "All QLs checked for wear<br>Belay and access cables showing no rust<br>Element climbed"
    self.periodic_environment_instructions ||= "Trees appear healthy, no loose or overhanging branches<br>Trail in good condition"
    self.save
  end

  def find_or_create_todays_inspection
    self.preuse_inspections.find_or_create_by(date:Date.today.strftime("%Y-%m-%d").to_s)
  end

  def find_past_inspection(date)
    self.preuse_inspections.find(date: Date.strptime(date, "%Y-%m-%d")).first
  end
end
